const Nunjucks =  require("nunjucks");
const i18n = require('eleventy-plugin-i18n');
const translations = require("./src/_data/i18n")

const desaccentify = s => {
    return s.replace(/[éèêë]/, 'e')
            .replace(/[ÉÈÊË]/, 'E')
            .replace(/[àâä]/, 'a')
            .replace(/[ÀÂä]/, 'A')
            .replace(/[îï]/, 'i')
            .replace(/[ÎÏ]/, 'I')
            .replace(/[ôÖ]/, 'o')
            .replace(/[ÔÖ]/, 'O');
}

module.exports = function(eleventyConfig) {
    let nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("src/_includes")
    );

    eleventyConfig.addFilter('desaccentify', desaccentify);

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    eleventyConfig.addPlugin(i18n, {
        translations: translations,
        fallbackLocales: {
            'en': 'fr'
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
