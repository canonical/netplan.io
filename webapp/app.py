import flask
import requests
import talisker
from canonicalwebteam.discourse import ( DiscourseAPI, Docs, DocParser )
from canonicalwebteam.flask_base.app import FlaskBase
from canonicalwebteam.search import build_search_view
from canonicalwebteam.templatefinder import TemplateFinder
from flask import render_template, make_response, request
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


# Discourse docs
session = talisker.requests.get_session()

discourse_docs = Docs(
    parser=DocParser(
        api=DiscourseAPI(
            base_url="https://discourse.ubuntu.com/", session=session
        ),
        index_topic_id=29004,
        url_prefix="/docs",
    ),
    document_template="docs/document.html",
    url_prefix="/docs",
)
discourse_docs.init_app(app)

app.add_url_rule(
    "/docs/search",
    "docs-search",
    build_search_view(
        session=session,
        site="netplan.io/docs",
        template_path="docs/search.html",
    ),
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


@app.context_processor
def inject_now():
    return {"now": datetime.utcnow()}


template_finder_view = TemplateFinder.as_view("template_finder")
app.add_url_rule("/", view_func=template_finder_view)
app.add_url_rule("/<path:subpath>", view_func=template_finder_view)
