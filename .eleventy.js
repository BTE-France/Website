const Nunjucks =  require("nunjucks");
const i18n = require('eleventy-plugin-i18n');
const translations = require("./src/_data/i18n")

const desaccentify = s => {
    return s.replaceAll(/[éèêë]/g, 'e')
            .replaceAll(/[ÉÈÊË]/g, 'E')
            .replaceAll(/[àâä]/g, 'a')
            .replaceAll(/[ÀÂä]/g, 'A')
            .replaceAll(/[îï]/g, 'i')
            .replaceAll(/[ÎÏ]/g, 'I')
            .replaceAll(/[ôÖ]/g, 'o')
            .replaceAll(/[ÔÖ]/g, 'O')
            .replaceAll(/ç/g, 'c')
            .replaceAll(/Ç/g, 'C');
}

const localizeUrl = (path, locale) => {
    if (/^[a-z]+:\/\//.test(path)) { // Starts with a protocole schema
        return path;
    }
    if (/^\/[a-z]{2}\//.test(path)) { // Already has a two letter language code
        return path;
    }
    if (path.startsWith('/')) {
        path = '/' + locale + path;
    } else  {
        console.warn("Found a relative URL when localizing, this is unsafe. Will not localize '" + path + "'");
    }
    return path;
};

module.exports = function(eleventyConfig) {
    let nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader("src/_includes")
    );

    eleventyConfig.addShortcode('url', localizeUrl)
    eleventyConfig.addFilter('desaccentify', desaccentify);

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    eleventyConfig.addPlugin(i18n, {
        translations: translations,
        fallbackLocales: {
            '*': 'fr'
        }
    });

    return {
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            includes: "src/_includes",
            data: "_data",
            output: "_site"
        }
    }
};
