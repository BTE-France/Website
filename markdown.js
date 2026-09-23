const escapeHTML = s => s.replaceAll('&', '&amp;')
                         .replaceAll('<', '&lt;')
                         .replaceAll('>', '&gt;')
                         .replaceAll('"', '&quot;');

class MarkdownDocument {
  children;

  constructor() {
    this.children = Array.from(arguments);
  }

  toHTML() {
    return this.children.map(c => c.toHTML()).join('\n');
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
    return '<a href="' + this.href + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(this.text) + '</a>';
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
    return '<a class="discord-channel" href="https://discord.com/channels/' + this.channelId + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(this.channelName) + '</a>'
  }

}

class ClassedSpan { // A span wrapping already-parsed inline children
  cssClass;
  children;

  constructor(cssClass, children) {
    this.cssClass = cssClass;
    this.children = children;
  }

  toHTML() {
    return '<span class="' + this.cssClass + '">' + this.children.map(c => c.toHTML()).join('') + '</span>';
  }

}

class MarkdownParser {

  #lines;

  #textPatterns = [
    [ /\*\*([^*]*)\*\*/g,  s => new ClassedSpan('emphasis', this.parseText(s[1]))],
    [ /`([^`]*)`/g,  s => new ClassedSpan('technical', [ new RegularText(s[1]) ])],
    [ /\[([^\]]+)\]\(([^\)]+)\)/g, c => new Link(c[1], c[2])],
    [ /<#([\d/]+),([^>]+)>/g, c => new DiscordChannel(c[1], c[2])],
    [ /@([^@\s]+)/g, c => new ClassedSpan('discord-user', [ new RegularText(c[1]) ])],
    [ /\[(visit(?:eurs?|ors?))]/gi, c => new ClassedSpan('visitor', [ new RegularText(c[1]) ])],
    [ /\[(d[ée]butants?|begginers?)\]/giu, c => new ClassedSpan('beginner', [ new RegularText(c[1]) ])],
    [ /\[(buildeu?rs?)\]/giu, c => new ClassedSpan('builder', [ new RegularText(c[1]) ])],
    [ /\[(contrema[iî]tres?|foremans?)\]/giu, c => new ClassedSpan('foreman', [ new RegularText(c[1]) ])],
    [ /\[(architecte?s?)\]/giu, c => new ClassedSpan('architect', [ new RegularText(c[1]) ])],
    [ /\[(ing[ée]nieurs?|engineers?)\]/giu, c => new ClassedSpan('engineer', [ new RegularText(c[1]) ])],
    [ /\[(archiviste?s?)\]/giu, c => new ClassedSpan('archivist', [ new RegularText(c[1]) ])],
    [ /\[(helpeu?rs?)\]/giu, c => new ClassedSpan('helper', [ new RegularText(c[1]) ])],
    [ /\[(supports?)\]/giu, c => new ClassedSpan('helper', [ new RegularText(c[1]) ])],
    [ /\[(d[ée]veloppeurs?|developers?)\]/giu, c => new ClassedSpan('developer', [ new RegularText(c[1]) ])],
    [ /\[(staffs?)\]/giu, c => new ClassedSpan('staff', [ new RegularText(c[1]) ])],
    [ /\[(fondat(?:eur|rice)|founder)\]/giu, c => new ClassedSpan('founder', [ new RegularText(c[1]) ])]
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
    if (text === '') return [];

    let best = null;
    for (const pattern of this.#textPatterns) {
      const regex = pattern[0];
      regex.lastIndex = 0;
      const match = regex.exec(text);
      if (match && (best === null || match.index < best.match.index)) {
        best = { match, factory: pattern[1] };
      }
    }

    if (!best) {
      return [ new RegularText(text) ];
    }

    const { match, factory } = best;
    const node = factory(match);
    const before = text.substring(0, match.index);
    const after = text.substring(match.index + match[0].length);

    return [
      ...this.parseText(before),
      node,
      ...this.parseText(after)
    ];
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