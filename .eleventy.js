module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  // TOC generator
  let markdownIt = require("markdown-it");
  let markdownItToc = require("markdown-it-table-of-contents");
  let markdownAnchor = require("markdown-it-anchor");
  let tocOptions = {
    includeLevel: [1,2,3,4]
  }
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options).use(markdownItToc, tocOptions).use(markdownAnchor);
  eleventyConfig.setLibrary("md", markdownLib);
};