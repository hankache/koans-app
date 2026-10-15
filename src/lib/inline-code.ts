/**
 * Splits text on Markdown-style code spans: `code`, or ``code with a ` in it``.
 * Returns plain parts and code parts, for rendering without any HTML injection.
 */
export interface Part {
  code: boolean;
  text: string;
}

export function inlineCode(text: string): Part[] {
  const parts: Part[] = [];
  const span = /(`+)([\s\S]+?)\1(?!`)/g;
  let last = 0;
  for (const m of text.matchAll(span)) {
    if (m.index! > last) parts.push({ code: false, text: text.slice(last, m.index) });
    parts.push({ code: true, text: m[2] });
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push({ code: false, text: text.slice(last) });
  return parts;
}

// Words that read as code: .not, toEqual, assert_equal, len(), and operators standing alone.
const CODE_WORD = /^(?:\.[A-Za-z_]\w*|[a-z]+[A-Z]\w*|[a-z]\w*_\w+|\w+\(\)|&&|\|\||\+\+?|={2,3}|!==?|%|\/\/|\*\*|\?\?|<=>|=>|<=|>=|\.{2,3})$/;

/**
 * inlineCode, plus code-looking words in the plain parts shown as code too: for text that comes
 * from code and can't carry backticks, like a test's description ('.not turns it around').
 */
export function codeLike(text: string): Part[] {
  const parts: Part[] = [];
  const push = (code: boolean, t: string) => {
    const prev = parts.at(-1);
    if (prev && prev.code === code && !code) prev.text += t;
    else parts.push({ code, text: t });
  };
  for (const part of inlineCode(text)) {
    if (part.code) {
      parts.push(part);
      continue;
    }
    // Words and the spaces between them; a word's trailing punctuation stays plain.
    for (const token of part.text.split(/(\s+)/)) {
      const m = token.match(/^(.*?)([,;:!?]*)$/)!;
      if (m[1] && CODE_WORD.test(m[1])) {
        push(true, m[1]);
        if (m[2]) push(false, m[2]);
      } else push(false, token);
    }
  }
  return parts;
}
