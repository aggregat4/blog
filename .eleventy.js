const toml = require("toml")
const browserslist = require("browserslist")
const lightningCSS = require("@11tyrocks/eleventy-plugin-lightningcss")

/*
This configuration file is picked up by filename convention.
*/
module.exports = function(eleventyConfig) {
  // or, use a Universal filter (an alias for all of the above)
  eleventyConfig.addFilter("isodate", function(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  })

  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      toml: toml.parse.bind(toml)
    }
  })

  eleventyConfig.addPassthroughCopy("_input/fonts")
  eleventyConfig.addPassthroughCopy("_input/images")
  eleventyConfig.addPassthroughCopy({ "robots.txt": "/robots.txt" })

  eleventyConfig.addPlugin(lightningCSS)
 
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
