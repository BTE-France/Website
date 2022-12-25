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

class MarkdownParser {

  #lines;

  #textPatterns = [
    [ /\*\*([^*]*)\*\*/g,  s => new EmphasisText(s[1])]
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