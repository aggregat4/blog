const toml = require("toml")
const browserslist = require("browserslist")
const { bundle, browserslistToTargets, composeVisitors } = require("lightningcss")

/*
This configuration file is picked up by filename convention.
*/
module.exports = function(eleventyConfig) {
  eleventyConfig.addTemplateFormats("css")
  // Process CSS with LightningCSS
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      console.debug("Processing css file: ", inputPath)
      let targets = browserslistToTargets(browserslist("last 12 Chrome versions, last 12 Firefox versions, last 12 Edge versions, Safari >= 15, Firefox ESR"))
      return async () => {
        // Switch to the `transform` function if you don't
        // plan to use `@import` to merge files
        let { code } = await bundle({
          filename: inputPath,
          minify: true,
          sourceMap: false,
          targets,
          // Supports CSS nesting
          drafts: {
            nesting,
          },
        });
        return code;
      };
    },
  });

  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("isodate", function(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  })

  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml)
    }
  })

  eleventyConfig.addPassthroughCopy("_input/static/fonts")
  eleventyConfig.addPassthroughCopy("_input/static/images")
  eleventyConfig.addPassthroughCopy({ "robots.txt": "/robots.txt" })

  // eleventyConfig.addPlugin(lightningCSS)
 
  // Ignore posts that start with underscore as they are drafts
  if(process.env.CI) {
    eleventyConfig.ignores.add("**/_*.md")
  }

  return {
    dir: {
      input: "_input"
    }
  }
}
