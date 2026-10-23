// Prolog syntax highlighting for CodeMirror 6, which has no Prolog mode of its own: comments,
// strings, quoted atoms, numbers, variables, the built-ins koans use, and operators.
import { StreamLanguage, type StreamParser } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

interface State {
  inComment: boolean;
}

// Every rule is anchored: StringStream.match tries it at the current position.
const number = /^(?:0'(?:\\.|.)|0x[0-9a-fA-F]+|0o[0-7]+|0b[01]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/;
const variable = /^[A-Z_][A-Za-z0-9_]*/;
const atom = /^[a-z][A-Za-z0-9_]*/;
const quotedAtom = /^'(?:\\.|''|[^'\\])*'/;
const string = /^"(?:\\.|""|[^"\\])*"/;
const backquoted = /^`(?:\\.|[^`\\])*`/;
const symbolic = /^[+\-*/\\^<>=~:.?@#&$]+/;

/** Control constructs and the built-ins the koans lean on, shown apart from the learner's names. */
const keywords = new Set(['is', 'rem', 'mod', 'div', 'xor', 'true', 'fail', 'false', '!', 'not', 'call', 'catch', 'throw', 'findall', 'bagof', 'setof', 'forall', 'once', 'ignore']);
const builtins = new Set([
  'test', 'begin_tests', 'end_tests', 'error', 'all', 'set', 'nondet',
  'append', 'member', 'memberchk', 'length', 'reverse', 'nth0', 'nth1', 'last', 'msort', 'sort', 'predsort', 'sum_list', 'sumlist',
  'max_list', 'min_list', 'numlist', 'exclude', 'include', 'partition', 'maplist', 'foldl', 'aggregate_all', 'between', 'succ', 'plus',
  'atom', 'number', 'integer', 'float', 'var', 'nonvar', 'compound', 'atomic', 'is_list', 'callable', 'ground', 'functor', 'arg',
  'copy_term', 'atom_codes', 'atom_chars', 'atom_length', 'atom_concat', 'sub_atom', 'atom_string', 'atom_number', 'number_codes',
  'char_code', 'upcase_atom', 'string_concat', 'string_chars', 'string_codes', 'string_length', 'split_string', 'string_lower',
  'string_upper', 'sub_string', 'number_string', 'term_to_atom', 'format', 'write', 'writeln', 'print', 'nl', 'assertz', 'asserta',
  'retract', 'retractall', 'dynamic', 'tab', 'phrase', 'atomic_list_concat', 'nb_getval', 'b_getval', 'nb_setval',
  'b_setval', 'list_to_assoc', 'put_assoc', 'get_assoc', 'pairs_keys_values', 'keysort', 'delete', 'subtract',
  'intersection', 'union', 'list_to_set', 'select', 'selectchk', 'permutation', 'string', 'text_concat',
]);

export const prologParser: StreamParser<State> = {
  name: 'prolog',
  startState: () => ({ inComment: false }),
  copyState: s => ({ ...s }),

  token(stream, state) {
    if (state.inComment) {
      if (stream.match(/^.*?\*\//)) state.inComment = false;
      else stream.skipToEnd();
      return 'comment';
    }
    if (stream.eatSpace()) return null;
    if (stream.match(/^%.*$/)) return 'comment';
    if (stream.match('/*')) {
      state.inComment = true;
      return 'comment';
    }
    if (stream.match(number)) return 'number';
    if (stream.match(string) || stream.match(backquoted)) return 'string';
    if (stream.match(quotedAtom)) return 'atom';
    if (stream.match(variable)) return 'variable';
    const word = stream.match(atom) as RegExpMatchArray | null;
    if (word) return keywords.has(word[0]) ? 'keyword' : builtins.has(word[0]) ? 'builtin' : 'atom';
    if (stream.match(':-') || stream.match('-->') || stream.match('->') || stream.match(symbolic)) return 'operator';
    if (stream.eat('!')) return 'keyword';
    if (stream.match(/^[[({\])}|,;]/)) return 'bracket';
    stream.next();
    return null;
  },

  tokenTable: {
    keyword: t.keyword,
    builtin: t.standard(t.variableName),
    atom: t.atom,
    number: t.number,
    variable: t.variableName,
    operator: t.operator,
    string: t.string,
    comment: t.comment,
    bracket: t.bracket,
  },
};

export const prolog = StreamLanguage.define(prologParser);
