const toml = require("toml");
const markdownIt = require("markdown-it");

/*
This configuration file is picked up by filename convention.
*/
module.exports = function (eleventyConfig) {
  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("isodate", function (date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  });

  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml),
    },
  });

  eleventyConfig.addPassthroughCopy("_input/fonts");
  eleventyConfig.addPassthroughCopy("_input/images");
  eleventyConfig.addPassthroughCopy({
    "logo-designs/logo-a-small-bold-export3.png": "favicon.png",
  });
  eleventyConfig.addPassthroughCopy({
    "logo-designs/logo-a-small-bold-export3.svg": "images/logo.svg",
  });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "/robots.txt" });

  // Custom markdown configuration as per https://www.11ty.dev/docs/languages/markdown/#default-options
  // specifically wanted the typography options for smart quotes and en/em dashes
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };
  eleventyConfig.setLibrary("md", markdownIt(options));

  // Ignore posts that start with underscore as they are drafts
  if (process.env.CI) {
    eleventyConfig.ignores.add("**/_*.md");
  }

  // Watch CSS file for changes in serve mode
  eleventyConfig.addWatchTarget("_input/css/all.css");

  return {
    dir: {
      input: "_input",
    },
  };
};
