// Which words in a test's description are code. A test's description comes from the koan's code
// ('.not turns an expectation around'), so it can't carry markup: instead, a word is shown as code
// when it appears as code in the same koan, outside strings and comments. The build stores each
// koan's code words in its manifest (scripts/build-koans.mjs); the result panel marks them
// (src/components/Meditation.svelte); `npm run check:koans -- --words` reports what gets marked.
// Plain JavaScript, so the build tools and the app share it.

/**
 * English words that are also keywords or method names. In a description they're nearly always
 * English ("is not equal"), so they stay text unless written with a symbol (`.not`, `not()`) or in
 * backticks.
 */
export const ENGLISH = new Set(
  ('a an and as at be by do does each else end first for from has have if in into is it its last ' +
   'let new next no not of on one or out over some than that the then this to up use var was when ' +
   'where while with yes all any only both more less same after before because but can may ' +
   // Nouns that are names in some koan's code but usually English in a description.
   'name names length missing function value values key keys item items list type error result size are class').split(' '),
);

/**
 * The code words of a koan: names (with sigils, dots and Raku's hyphens), Ruby symbols and
 * predicates, and operators, from its code with strings and comments left out.
 * @param {string} code
 * @param {string} comment  the language's line comment marker: '#', '//', '--'
 * @param {{ names?: 'all' | 'called' }} [options]  'called': a lowercase name counts only when it's
 *   called, name(…). For SQL, whose table and column names are everyday words (people, city).
 * @returns {string[]}
 */
export function codeWords(code, comment, { names = 'all' } = {}) {
  // Code without strings and comments: each string's quotes and contents become spaces.
  let plain = '';
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (code.startsWith(comment, i)) {
      while (i < code.length && code[i] !== '\n') i++;
      plain += '\n';
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') {
      // Python's triple quotes, or a single quote; a backslash escapes the next character.
      const quote = code.startsWith(ch.repeat(3), i) ? ch.repeat(3) : ch;
      i += quote.length;
      while (i < code.length && !code.startsWith(quote, i)) {
        if (code[i] === '\\') i++;
        if (code[i] === '\n' && quote.length === 1) break;
        i++;
      }
      i += quote.length - 1;
      plain += ' ';
      continue;
    }
    plain += ch;
  }

  const words = new Set();
  // Called: a bracket right after the name, count(*); a table's definition, sales (…), has a space.
  const called = new Set([...plain.matchAll(/([A-Za-z_][\w.]*)\(/g)].map(m => m[1]));
  const keep = name => names === 'all' || !/^[a-z_]/.test(name) || called.has(name);
  // Names: a sigil or colon (Raku, Perl, PHP, Ruby), hyphenated parts (Raku), a ? or ! (Ruby),
  // and dotted chains (Object.is, is.na, self.name).
  const NAME = /[$@%&:]?[A-Za-z_][\w]*(?:-[A-Za-z_]\w*)*[?!]?(?:\.[A-Za-z_]\w*(?:-[A-Za-z_]\w*)*[?!]?)*/g;
  for (const [token] of plain.matchAll(NAME)) {
    const sigil = /^[$@%&:]/.test(token) ? token[0] : '';
    const parts = token.slice(sigil.length).split('.');
    if (!keep(token.slice(sigil.length))) continue;
    words.add(token);
    if (sigil) words.add(token.slice(1));
    for (let i = 0; i < parts.length; i++) {
      words.add(parts[i]);
      if (i > 0) words.add(parts.slice(0, i + 1).join('.'));
      // A chain's later links, on their own: .toBe, .not.toBe.
      for (let j = i + 1; i > 0 && j <= parts.length; j++) words.add(`.${parts.slice(i, j).join('.')}`);
    }
  }
  // Methods and attributes after a closing bracket, and their chains: ).not, ].length, ).not.toThrow.
  for (const [, chain] of plain.matchAll(/[)\]]((?:\.[A-Za-z_]\w*[?!]?)+)/g)) {
    const names = chain.slice(1).split('.');
    for (let i = 0; i < names.length; i++) words.add(`.${names.slice(0, i + 1).join('.')}`);
  }
  // Operators, two characters or more, or one that reads clearly on its own.
  for (const [op] of plain.matchAll(/[+\-*/%=<>!&|^~?.:]+/g)) {
    if (op.length > 1 || '+*/%<>!&|^~?'.includes(op)) words.add(op);
  }
  // Single letters are too ambiguous, and the blank isn't code.
  return [...words].filter(w => (w.length > 1 || /[^A-Za-z]/.test(w)) && !/^_+$/.test(w)).sort();
}

// An English word, unless it's written in capitals, as SQL keywords are (NOT IN, AND).
const isEnglish = word => ENGLISH.has(word.toLowerCase()) && !/^[A-Z]{2,}$/.test(word);

/**
 * Splits a description into plain and code parts: backtick spans are code, and so is any word
 * that's one of the koan's code words, unless it's an English word (see ENGLISH) or a single letter.
 * @param {string} text
 * @param {Iterable<string>} words  the koan's code words
 * @returns {{ code: boolean, text: string }[]}
 */
export function markCode(text, words) {
  const known = words instanceof Set ? words : new Set(words);
  const parts = [];
  const push = (code, t) => {
    const prev = parts.at(-1);
    if (prev && !code && !prev.code) prev.text += t;
    else parts.push({ code, text: t });
  };
  const span = /(`+)([\s\S]+?)\1(?!`)/g;
  let last = 0;
  const plain = t => {
    for (const token of t.split(/(\s+)/)) {
      // A whole token that's code, punctuation and all: ??, ...
      if (token && known.has(token) && !isEnglish(token)) {
        push(true, token);
        continue;
      }
      // Brackets and sentence punctuation around a word stay plain: (len), "x", done.
      const m = token.match(/^([("']*)(.*?)([)"',;:!?.]*)$/s);
      const [, open, core, close] = m;
      // A Ruby predicate keeps its ?: empty? is a word, the ? isn't punctuation.
      const withMark = close.startsWith('?') || close.startsWith('!') ? core + close[0] : null;
      const word = withMark && known.has(withMark) ? withMark : core;
      const rest = word === withMark ? close.slice(1) : close;
      const isCode = word && known.has(word) && !isEnglish(word) && !/^[A-Za-z]$/.test(word);
      if (isCode) {
        if (open) push(false, open);
        push(true, word);
        if (rest) push(false, rest);
      } else push(false, token);
    }
  };
  for (const m of text.matchAll(span)) {
    if (m.index > last) plain(text.slice(last, m.index));
    parts.push({ code: true, text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) plain(text.slice(last));
  return parts;
}
