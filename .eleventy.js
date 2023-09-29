const toml = require("toml");
const browserslist = require("browserslist");
const {
  transform,
  browserslistToTargets,
  composeVisitors,
} = require("lightningcss");

/*
This configuration file is picked up by filename convention.
*/
module.exports = function (eleventyConfig) {
  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("isodate", function (date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  });

  const targets = browserslistToTargets(
    browserslist(
      "last 12 Chrome versions, last 12 Firefox versions, last 12 Edge versions, Safari >= 15, Firefox ESR"
    )
  );

  eleventyConfig.addFilter("lightningcss", (inputCode) => {
    const options = {
      filename: "",
      code: Buffer.from(inputCode),
      minify: true,
      sourceMap: false,
      targets,
      // Supports CSS nesting
      drafts: {
        nesting: true,
      },
    };
    let { code } = transform(options);
    return code.toString();
  });

  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml),
    },
  });

  eleventyConfig.addPassthroughCopy("_input/fonts");
  eleventyConfig.addPassthroughCopy("_input/images");
  eleventyConfig.addPassthroughCopy({ "robots.txt": "/robots.txt" });

  // Ignore posts that start with underscore as they are drafts
  if (process.env.CI) {
    eleventyConfig.ignores.add("**/_*.md");
  }

  return {
    dir: {
      input: "_input",
    },
  };
};
