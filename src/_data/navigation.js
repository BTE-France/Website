class NavigationEntry {
  link;
  translationKey;
  primary;
  constructor(link, translationKey, primary) {
    this.link = link;
    this.translationKey = translationKey;
    this.primary = primary;
  }
}

module.exports = [
  new NavigationEntry('../', 'navigation.home', true),
  new NavigationEntry('../maps/', 'navigation.maps', true),
  new NavigationEntry('../gallery/', 'navigation.gallery', true),
  new NavigationEntry('../rules/', 'navigation.rules', true),
  new NavigationEntry('../rules/#ranks', 'navigation.ranks', false),
  new NavigationEntry('../faq/', 'navigation.faq', true),
  new NavigationEntry('https://remi.btefrance.fr', 'navigation.remi', false),
];