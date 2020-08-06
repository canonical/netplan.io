module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  // TOC generator
  let markdownIt = require("markdown-it");
  let markdownItToc = require("markdown-it-toc-done-right");
  let markdownAnchor = require("markdown-it-anchor");
  let definitionLists = require('markdown-it-deflist')
  let tocOptions = {
    level: [1,2,3,4],
    listType: "ul",
    listClass: "markdown-list"
  }
  let options = {
    html: true,
    breaks: true,
    xhtmlOut: true,
    typographer: true,
  };
  let markdownLib = markdownIt(options).use(markdownItToc, tocOptions).use(markdownAnchor).use(definitionLists);
  eleventyConfig.setLibrary("md", markdownLib);
};
