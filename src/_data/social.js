class SocialMedia {
  translationKey;
  link;
  iconLinkMono;
  iconLinkColor;
  constructor(name, link) {
    this.translationKey = "social." + name;
    this.link = link;
    this.iconLinkColor = "/assets/img/social/" + name + "-color.svg";
    this.iconLinkMono = "/assets/img/social/" + name + "-mono.svg";
  }
}

module.exports = [
  new SocialMedia('discord', "https://discord.btefrance.fr"),
  new SocialMedia('youtube', "https://www.youtube.com/c/BTEFrance"),
  new SocialMedia('twitter', "https://twitter.com/BTE_France"),
  new SocialMedia('instagram', "https://www.instagram.com/bte_france"),
  new SocialMedia('facebook', "https://www.facebook.com/Build-The-Earth-France-113380800556340"),
  new SocialMedia('reddit', "https://www.reddit.com/user/BTE_France"),
  new SocialMedia('planetminecraft', "https://www.planetminecraft.com/member/bte-france"),
  new SocialMedia('tiktok', "https://www.tiktok.com/@btefrance"),
  new SocialMedia('github', "https://github.com/BTE-France"),
]