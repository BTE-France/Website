class Related {
  translationKey;
  link;
  constructor(translationKey, link) {
    this.translationKey = translationKey;
    this.link = link;
  }
}

module.exports = [
  new Related("related.bte", "https://buildtheearth.net"),
  new Related("related.terraplusplus", "https://www.curseforge.com/minecraft/mc-mods/terraplusplus"),
  new Related("related.terramap", "https://www.curseforge.com/minecraft/mc-mods/terramap"),
]