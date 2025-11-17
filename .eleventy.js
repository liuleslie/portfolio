module.exports = function(eleventyConfig) {
  
  // Copy images through
  eleventyConfig.addPassthroughCopy("images");
  
  // Projects collection
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("projects/*.md");
  });

  return {
    dir: {
      input: ".",        // current directory
      output: "_site"    // where built site goes
    }
  };
};