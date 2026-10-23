// Scheme for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'scheme',
  name: 'Scheme',
  tagline: 'Learn Scheme from its lists to its continuations',
  testedWith: { name: 'SRFI 64', url: 'https://srfi.schemers.org/srfi-64/srfi-64.html' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  // Scheme's: a lambda.
  look: {
    accent: { light: '#a3383a', dark: '#ec8f88' },
    emblem:
      '<path d="M24.5 33.5 H28.5 L40 56 M33 42.5 L25 56" fill="none" stroke="{F}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  about:
    'Scheme is a Lisp reduced to its essentials: a few forms, lists to hold both data and code, and functions as values. Its small size has made it the language of classic computer science books and courses, and a laboratory for ideas such as tail calls, continuations and hygienic macros. These koans follow R7RS, its current standard: lists and pairs, recursion, higher-order functions, closures, records, continuations and macros.',
  site: { url: 'https://www.scheme.org', label: 'scheme.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Lambda, the ultimate.', 'Car, cdr, and calm.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'The essence of Lisp',
  journey: 'From pairs and lists to recursion, continuations and macros.',
  framework: 'SRFI 64',
  kinds: ['think'],
  teasers: [
    { before: '(test-equal ', after: " (cons 1 '(2 3)))", choices: ["'(1 2 3)", "'(1 (2 3))", "'((1) 2 3)"], answer: "'(1 2 3)", why: 'cons puts an item in front of a list.' },
    { before: '(test-equal ', after: " (cdr '(1 2 3)))", choices: ["'(2 3)", '3', "'(3)"], answer: "'(2 3)", why: 'cdr is everything after the first item.' },
  ],
  // The koan as a file of its test framework, named its way (name-test.scm), on the editor's bar.
  testFile: slug => `${slug}-test.scm`,
  worker: { url: 'runtime/scheme/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.scm:3".
    line: /koan\.scm:(\d+)/,
    // And starts it with the error's message: "car: not a pair".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
