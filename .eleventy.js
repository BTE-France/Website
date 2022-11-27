const Nunjucks =  require("nunjucks");
const i18n = require('eleventy-plugin-i18n');
const translations = require("./src/_data/i18n")

module.exports = function(eleventyConfig) {
    let nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("src/_includes")
    );

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    eleventyConfig.addPlugin(i18n, {
        translations: translations,
        fallbackLocales: {
            'en-US': 'fr_FR'
        }
    });

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            includes: "src/_includes",
            data: "src/_data",
            output: "_site"
        }
    }
};
