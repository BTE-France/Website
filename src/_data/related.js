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
  new Related("related.download.windows", "https://s3.buildtheearth.net/public/installer/latest/BTEInstaller-windows.zip"),
  new Related("related.download.mac", "https://s3.buildtheearth.net/public/installer/latest/BTEInstaller-mac.dmg"),
  new Related("related.download.linux", "https://s3.buildtheearth.net/public/installer/latest/BTEInstaller-linux.AppImage"),
  new Related("related.download.universal", "https://s3.buildtheearth.net/public/installer/latest/BTEInstaller-universal.jar"),
]