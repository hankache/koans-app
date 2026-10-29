// Clojure for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'clojure',
  name: 'Clojure',
  tagline: 'Learn Clojure from its data structures to its macros',
  testedWith: { name: 'clojure.test', url: 'https://clojure.github.io/clojure/clojure.test-api.html' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  // Clojure's: a lambda cut out of a circle.
  look: {
    accent: { light: '#3d7a2c', dark: '#8ccf6c' },
    emblem:
      '<circle cx="32" cy="44.5" r="11.5" fill="{F}"/><path d="M26.5 36.5 H29.5 L37.5 53 M32.6 43.6 L27 53" fill="none" stroke="{C}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  about:
    'Clojure is a modern Lisp: a small, consistent language built around immutable data and functions that transform it. Programs are made of plain maps, vectors and sets rather than classes, and macros let the language grow with your needs. It runs on the Java platform and, as ClojureScript, in JavaScript, which is how it runs here. These koans cover its data structures, sequences and laziness, functions and destructuring, state with atoms, protocols, records and multimethods, and macros.',
  site: { url: 'https://clojure.org', label: 'clojure.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Data, not ceremony.', 'Simple made easy.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'A modern Lisp, built on data',
  journey: 'From maps and vectors to sequences, protocols and macros.',
  framework: 'clojure.test',
  kinds: ['data', 'think'],
  teasers: [
    { before: '(is (= ', after: ' (+ 1 2 3)))', choices: ['6', '123', '3'], answer: '6', why: 'In Clojure the function comes first, and + adds any number of numbers.' },
    { before: '(is (= ', after: ' (get {:name "Ada"} :name)))', choices: ['"Ada"', ':name', 'nil'], answer: '"Ada"', why: 'get looks up a key in a map; :name is a keyword, Clojure\'s usual kind of key.' },
  ],
  // The koan as a file of its test framework, named its way (clojure.test: name_test.clj), on the editor's bar.
  testFile: slug => `${slug.replaceAll('-', '_')}_test.clj`,
  worker: { url: 'runtime/clojure/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.clj:3".
    line: /koan\.clj:(\d+)/,
    // And starts it with Scittle's message: "Unable to resolve symbol: nope".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
