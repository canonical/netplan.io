from urllib.parse import urlencode
from canonicalwebteam.flask_base.app import FlaskBase
from flask import render_template, make_response, redirect, g, request, session
from canonicalwebteam.templatefinder import TemplateFinder
from canonicalwebteam.cookie_service import CookieConsent, check_session_and_redirect, sync_preferences_cookie
from datetime import datetime, timedelta
from flask_caching import Cache


# Rename your project below
app = FlaskBase(
    __name__,
    "netplan.io",
    template_folder="../templates",
    static_folder="../static",
    template_404="404.html",
    template_500="500.html",
)


# Configuration for shared cookie service

# Configure Flask session
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=365)
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = True

# Initialize Flask-Caching
app.config["CACHE_TYPE"] = "SimpleCache"
cache = Cache(app)


# Set up cache functions for cookie consent service
def get_cache(key):
    return cache.get(key)


def set_cache(key, value, timeout):
    cache.set(key, value, timeout)


cookie_service = CookieConsent().init_app(
    app,
    get_cache_func=get_cache,
    set_cache_func=set_cache,
    start_health_check=True,
    auto_register_hooks=False,
)

@app.before_request
def my_before_request():
    """
    Before request hook that checks for user session
    and redirects to cookie service if needed.
    """
    # Check health, set flag, and stop processing if service is down
    # Uses flask.g so it resets on every request
    if cookie_service.client.is_service_up():
        g.cookies_service_up = True
    else:
        return None

    # Check if we have already redirected to create session
    if request.cookies.get("_cookies_redirect_completed") is not None:
        return

    # Perform session check and and create redirect if needed
    # response = check_session_and_redirect()

    if "user_uuid" in session:
        return False

    service_url = app.config["CENTRAL_COOKIE_SERVICE_URL"]
    params = urlencode({"return_uri": request.url})
    redirect_url = (
        f"{service_url}/api/v1/cookies/session?{params}"
    )

    response = redirect(redirect_url)
    
    # If we got a response (redirect), set flag cookie for this session
    if response:
            response.set_cookie(
                "_cookies_redirect_completed",
                "true",
                samesite="Lax",
                secure=True,
            )
    return response

@app.after_request
def my_after_request(response):
    # Your custom logic here
    response = sync_preferences_cookie(response)
    return response

@app.route("/sitemap.xml")
def sitemap_index():
    xml_sitemap = render_template("sitemap/sitemap-index.xml")
    response = make_response(xml_sitemap)
    response.headers["Content-Type"] = "application/xml"

    return response


@app.route("/sitemap-links.xml")
def sitemap_links():
    xml_sitemap = render_template("sitemap/sitemap-links.xml")
    response = make_response(xml_sitemap)
    response.headers["Content-Type"] = "application/xml"

    return response


@app.route("/reference")
def reference():
    return redirect(
        "https://netplan.readthedocs.io" "/en/latest/netplan-yaml",
        code=302,
    )


@app.route("/examples")
def examples():
    return redirect(
        "https://github.com" "/canonical/netplan/tree/main/examples", code=302
    )


@app.context_processor
def inject_now():
    return {"now": datetime.utcnow()}


template_finder_view = TemplateFinder.as_view("template_finder")
app.add_url_rule("/", view_func=template_finder_view)
app.add_url_rule("/<path:subpath>", view_func=template_finder_view)
