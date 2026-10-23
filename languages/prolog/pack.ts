// Prolog for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'prolog',
  name: 'Prolog',
  tagline: 'Learn Prolog from its facts to its grammars',
  testedWith: { name: 'plunit', url: 'https://www.swi-prolog.org/pldoc/doc_for?object=section(%27packages/plunit.html%27)' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  // Prolog's: :-, the "if" of every rule.
  look: {
    accent: { light: '#6b3fa0', dark: '#c4a7ec' },
    emblem:
      '<g fill="{F}"><circle cx="24" cy="39.6" r="3.2"/><circle cx="24" cy="49.4" r="3.2"/><rect x="30.6" y="42.3" width="13.4" height="4.4" rx="2.2"/></g>',
  },
  about:
    'Prolog is a logic programming language: instead of saying how to compute an answer, you state facts and rules, and ask questions that Prolog answers by searching for every solution. It is used for parsing, expert systems, planning, and puzzles of every kind. These koans follow SWI-Prolog: facts and queries, unification, lists and recursion, arithmetic, backtracking and the cut, negation, collecting solutions, and grammars.',
  site: { url: 'https://www.swi-prolog.org', label: 'swi-prolog.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['true.', 'Yes, and no more solutions.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Programming in logic',
  journey: 'From facts and unification to backtracking, the cut and grammars.',
  framework: 'plunit',
  kinds: ['think'],
  teasers: [
    { before: 'test(t, X == ', after: ') :- X is 7 // 2.', choices: ['3', '3.5', '4'], answer: '3', why: '// divides integers and drops the remainder.' },
    { before: 'test(t, T == ', after: ') :- [_|T] = [a, b, c].', choices: ['[b, c]', 'b', '[c]'], answer: '[b, c]', why: '[Head|Tail] splits a list: its first item, and the list of the rest.' },
  ],
  // The koan as a file of its test framework, named its way (name.plt), on the editor's bar.
  testFile: slug => `${slug.replaceAll('-', '_')}.plt`,
  worker: { url: 'runtime/prolog/worker.js', type: 'module' },
  errors: {
    // The worker ends an error with the koan's line: "    at koan.pl:3".
    line: /koan\.pl:(\d+)/,
    // And starts it with SWI-Prolog's message: "Syntax error: Operator expected".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
