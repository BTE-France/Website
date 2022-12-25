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

class UnorderedList {
  entries;
  constructor() {
    this.entries = Array.from(arguments)
  }
  toHTML() {
    return '<ul>' + this.entries.map(e => e.toHTML()).join('') + '</ul>';
  }
}

class ListEntry {

  children;

  constructor() {
    this.children = Array.from(arguments);
  }

  toHTML() {
    return '<li>' + this.children.map(e => e.toHTML()).join(" ") + '</li>';
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

class Link {
  text;
  href;

  constructor(text, href) {
    this.text = text;
    this.href = href;
  }

  toHTML() {
    return '<a href="' + this.href + '" target="_blank">' + escapeHTML(this.text) + '</a>';
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

class ClassedSpan { // A span with a specific class
  cssClass;
  text;

  constructor(cssClass, text) {
    this.cssClass = cssClass;
    this.text = text;
  }

  toHTML() {
    return '<span class="' + this.cssClass + '">' + escapeHTML(this.text) + '</span>';
  }

}

class MarkdownParser {

  #lines;

  #textPatterns = [
    [ /\*\*([^*]*)\*\*/g,  s => new ClassedSpan('emphasis', s[1])],
    [ /`([^`]*)`/g,  s => new ClassedSpan('technical', s[1])],
    [ /\[([^\]]+)\]\(([^\)]+)\)/g, c => new Link(c[1], c[2])],
    [ /<#([\d/]+),([^>]+)>/g, c => new DiscordChannel(c[1], c[2])],
    [ /@([^@\s]+)/g, c => new ClassedSpan('discord-user', c[1])],
    [ /\[(visit(?:eurs?|ors?))]/gi, c => new ClassedSpan('visitor', c[1])],
    [ /\[(d[ée]butants?|begginers?)\]/giu, c => new ClassedSpan('beginner', c[1])],
    [ /\[(buildeu?rs?)\]/giu, c => new ClassedSpan('builder', c[1])],
    [ /\[(contrema[iî]tres?|foremans?)\]/giu, c => new ClassedSpan('foreman', c[1])],
    [ /\[(architecte?s?)\]/giu, c => new ClassedSpan('architect', c[1])],
    [ /\[(ing[ée]nieurs?|engineers?)\]/giu, c => new ClassedSpan('engineer', c[1])],
    [ /\[(archiviste?s?)\]/giu, c => new ClassedSpan('archivist', c[1])],
    [ /\[(helpeu?rs?)\]/giu, c => new ClassedSpan('helper', c[1])],
    [ /\[(d[ée]veloppeurs?|developers?)\]/giu, c => new ClassedSpan('developer', c[1])],
    [ /\[(staffs?)\]/giu, c => new ClassedSpan('staff', c[1])],
    [ /\[(fondat(?:eur|rice)|founder)\]/giu, c => new ClassedSpan('founder', c[1])]
  ];

  parse(text) {
    this.#lines = text.split("\n");
    let doc = [];
    while (this.#lines.length) {
      if (this.#lines[0].startsWith(' - ')) {
        doc.push(this.#parseUl());
      } else {
        doc.push(this.#parseParagraph());
      }
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
      if (this.#isNextLineSpecial()) break;
      let line = this.#lines.shift();
      if (line.trim() === '') break;
      elements = elements.concat(this.parseText(line));
    }
    return new Paragraph(...elements);
  }

  #parseUl() {
    let entries = [];
    while (this.#lines[0] && this.#lines[0].startsWith(' - ')) {
      entries.push(this.#parseUlEntry());
    }
    return new UnorderedList(...entries);
  }

  #parseUlEntry() {
    let elements = [];
    let first = true;
    while (this.#lines.length) {
      if (!first && this.#isNextLineSpecial()) break;
      first = false;
      let line = this.#lines.shift();
      if (line.trim() === '') break;
      elements = elements.concat(this.parseText(line.substring(3)));
    }
    return new ListEntry(...elements);
  }

  #isNextLineSpecial() {
    let nextLine = this.#lines[0];
    return nextLine.startsWith(' - ');
  }

}

module.exports = {
  MarkdownParser: MarkdownParser
}

new MarkdownParser().parse(' - test\n - retest');