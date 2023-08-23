const toml = require("toml");

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

  eleventyConfig.addPassthroughCopy({ static: "/" })
  eleventyConfig.addPassthroughCopy({ "robots.txt": "/robots.txt" })
 
  // Ignore posts that start with underscore as they are drafts
  if(process.env.CI) {
    eleventyConfig.ignores.add("**/_*.md")
  }
}
