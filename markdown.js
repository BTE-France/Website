const escapeHTML = s => s.replaceAll('&', '&amp')
                         .replaceAll('<', '&lt;')
                         .replaceAll('>', '&gt;')
                         .replaceAll('"', '&quot;');

class MarkdownDocument {
  children;

  constructor() {
    this.children = Array.from(arguments);
  }

  toHTML() {
    return this.children.map(c => c.toHTML()).join('<br>');
  }

}

class Paragraph {

  children;

  constructor() {
    this.children = Array.from(arguments);
  }

  toHTML() {
    return '<p>' + this.children.map(e => e.toHTML()).join(" ") + '</p>';
  }

}

class RegularText {
  text;

  constructor(text) {
    this.text = text;
  }

  toHTML() {
    return escapeHTML(this.text);
  }

}

class EmphasisText {
  text;

  constructor(text) {
    this.text = text;
  }

  toHTML() {
    return '<span class="emphasis">' + escapeHTML(this.text) + '</span>';
  }
}

class DiscordChannel {

  channelId;
  channelName;

  constructor(channelId, channelName) {
    this.channelId = channelId;
    this.channelName = channelName;
  }

  toHTML() {
    return '<a class="discord-channel" href="https://discord.com/channels/' + this.channelId + '">' + escapeHTML(this.channelName) + '</a>'
  }

}

class DiscordUserMention {
  username;

  constructor(username) {
    this.username = username;
  }

  toHTML() {
    return '<span class="discord-user">' + escapeHTML(this.username) + '</span>';
  }

}

class Role {
  cssClass;
  text;

  constructor(cssClass, text) {
    this.cssClass = cssClass;
    this.text = text;
  }

  toHTML() {
    return '<span class="' + this.cssClass + '">[' + escapeHTML(this.text) + ']</span>';
  }

}

class MarkdownParser {

  #lines;

  #textPatterns = [
    [ /\*\*([^*]*)\*\*/g,  s => new EmphasisText(s[1])],
    [ /<#([\d/]+),([^>]+)>/g, c => new DiscordChannel(c[1], c[2])],
    [ /@([^@\s]+)/g, c => new DiscordUserMention(c[1])],
    [ /\[(visit(?:eur|or))]/gi, c => new Role('visitor', c[1])],
    [ /\[(d[ée]butant|begginer)\]/giu, c => new Role('beginner', c[1])],
    [ /\[(buildeu?r)\]/giu, c => new Role('builder', c[1])],
    [ /\[(contrema[iî]tre|foreman)\]/giu, c => new Role('foreman', c[1])],
    [ /\[(architecte?)\]/giu, c => new Role('architect', c[1])],
    [ /\[(ing[ée]nieur|engineer)\]/giu, c => new Role('engineer', c[1])],
    [ /\[(archiviste?)\]/giu, c => new Role('archivist', c[1])],
    [ /\[(helpeu?r)\]/giu, c => new Role('helper', c[1])],
    [ /\[(d[ée]veloppeur|developer)\]/giu, c => new Role('developer', c[1])],
    [ /\[(staff)\]/giu, c => new Role('staff', c[1])],
    [ /\[(fondat(?:eur|rice)|founder)\]/giu, c => new Role('founder', c[1])]
  ];

  parse(text) {
    this.#lines = text.split("\n");
    let doc = [];
    while (this.#lines.length) {
      doc.push(this.#parseParagraph());
    }
    return new MarkdownDocument(...doc);
  }

  parseText(text) {
    let pattern = this.#textPatterns.find(p => p[0].test(text));
    if (pattern) {
      let regex = pattern[0];
      regex.lastIndex = 0; // Reset before we rerun the search with exec to get the capture groups
      let match = regex.exec(text);
      let result = [ pattern[1](match) ];
      let left = this.parseText(text.substring(0, match.index));
      let right = this.parseText(text.substring(match.index + match[0].length));
      if (left) result = left.concat(result);
      if (right) result = result.concat(right);
      return result;
    } else {
      return [ new RegularText(text) ];
    }
  }


  #parseParagraph() {
    let elements = [];
    while (this.#lines.length) {
      let line = this.#lines.shift();
      if (line.trim() === '') break;
      elements = elements.concat(this.parseText(line));
    }
    return new Paragraph(...elements);
  }

}

module.exports = {
  MarkdownParser: MarkdownParser
}