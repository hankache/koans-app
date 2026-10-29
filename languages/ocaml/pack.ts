// OCaml for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'ocaml',
  name: 'OCaml',
  tagline: 'Learn OCaml from its types to its modules',
  testedWith: { name: 'Alcotest', url: 'https://github.com/mirage/alcotest' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  // OCaml's: a camel, facing right.
  look: {
    accent: { light: '#ad5016', dark: '#f2a46e' },
    emblem:
      '<path d="M20 41.5 C20.4 37.6 22.4 35.2 25.2 35.2 C27.6 35.2 28.8 37 29.4 38.8 C30.2 36.4 31.8 35.4 33.4 35.4 C35.6 35.4 36.6 37.4 37.2 39.6 C37.4 40.6 37.8 40.6 38.2 39.4 L39.8 35.2 C40.4 33.8 41.6 32.9 43.2 32.9 C44.9 32.9 46.1 33.7 46.6 34.9 C47 36.2 46.4 37.3 45.1 37.3 L44.6 37.3 C44 37.3 43.6 37.7 43.4 38.3 L42.4 43.6 C41.9 46 40 47 37.6 47 L22.6 47 C20.6 47 19.6 45.4 19.6 43.6 Z" fill="{F}"/><path d="M22.9 46 V56.4 M25.7 46 V56 M34.4 46 V56 M37.2 46 V56.4" fill="none" stroke="{F}" stroke-width="2" stroke-linecap="round"/><path d="M20.2 42.4 C19 43.6 18.6 45.6 18.8 47.8" fill="none" stroke="{F}" stroke-width="1.1" stroke-linecap="round"/><path d="M41.6 33.8 L41 32" fill="none" stroke="{F}" stroke-width="1.1" stroke-linecap="round"/><circle cx="44.3" cy="34.9" r="0.75" fill="{C}"/>',
  },
  about:
    'OCaml is a functional language with a strong, static type system that infers types for you, so programs are safe without being verbose. Its pattern matching, algebraic data types and module system make it a favorite for compilers, proof assistants, finance and systems tools. These koans cover its expressions and types, lists and pattern matching, records and variants, options and results, higher-order functions, modules and functors, and mutable state.',
  site: { url: 'https://ocaml.org', label: 'ocaml.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Well typed.', 'It compiles, so it works.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Functional, typed, and fast',
  journey: 'From types and pattern matching to variants, modules and functors.',
  framework: 'Alcotest',
  kinds: ['think'],
  teasers: [
    { before: 'let () = check int "" ', after: ' (List.length [1, 2, 3])', choices: ['3', '1', '6'], answer: '1', why: 'Commas make a tuple: [1, 2, 3] is a list holding one tuple. OCaml separates list items with ;.' },
    { before: 'let () = check int "" ', after: ' (7 / 2)', choices: ['3', '3.5', '4'], answer: '3', why: '/ divides whole numbers and drops the remainder.' },
  ],
  // The koan as a file of its test framework, named its way (test_name.ml), on the editor's bar.
  testFile: slug => `test_${slug.replaceAll('-', '_')}.ml`,
  worker: { url: 'runtime/ocaml/worker.js', type: 'module' },
  errors: {
    // The worker ends an error with the koan's line: "    at koan.ml:3".
    line: /koan\.ml:(\d+)/,
    // And starts it with OCaml's message: "Unbound value nope".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
