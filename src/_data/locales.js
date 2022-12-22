class Locale {
  code;
  label;
  constructor(code, label) {
    this.code = code;
    this.label = label;
  }
}

module.exports = [
  new Locale('fr', "Français"),
  new Locale('en', "English"),
]