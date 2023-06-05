from canonicalwebteam.flask_base.app import FlaskBase
from flask import render_template, make_response, redirect
from canonicalwebteam.templatefinder import TemplateFinder
from datetime import datetime


# Rename your project below
app = FlaskBase(
    __name__,
    "netplan.io",
    template_folder="../templates",
    static_folder="../static",
    template_404="404.html",
    template_500="500.html",
)


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
