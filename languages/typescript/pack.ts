// TypeScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'typescript',
  name: 'TypeScript',
  tagline: 'Learn TypeScript’s types, from annotations to generics',
  testedWith: 'Vitest’s `expect` and `expectTypeOf`',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#173f4d', dark: '#7fb0c4' },
    emblem:
      '<path d="M21.5 34.5 H38 L45 44 L38 53.5 H21.5 Z" fill="{F}" stroke="{F}" stroke-width="3" stroke-linejoin="round"/><circle cx="38.6" cy="44" r="2.1" fill="{C}"/><rect x="23.6" y="38" width="10.4" height="3" fill="{C}"/><rect x="27.3" y="38" width="3" height="12" fill="{C}"/>',
  },
  about:
    'TypeScript is JavaScript with types. You describe the shape of your data, and the compiler checks your code before it runs, catching mistakes and powering your editor’s suggestions; then the types disappear and plain JavaScript runs. Many large JavaScript projects are written in it. These koans explore its unusually rich type system: unions and narrowing, generics, and types computed from other types.',
  site: { url: 'https://www.typescriptlang.org', label: 'typescriptlang.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['The compiler is satisfied.', 'Not an `any` in sight.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'JavaScript, with a type system',
  journey: 'From the first annotation to types built from other types.',
  framework: 'Vitest',
  kinds: ['web', 'think'],
  teasers: [
    { context: 'const x = 42;', before: 'expectTypeOf(x).toEqualTypeOf<', after: '>();', choices: ['number', '42', 'const'], answer: '42', why: 'A const keeps its literal type.' },
    { context: 'let y = 42;', before: 'expectTypeOf(y).toEqualTypeOf<', after: '>();', choices: ['number', '42', 'unknown'], answer: 'number', why: 'A let can change, so it widens.' },
  ],
  worker: { url: 'runtime/typescript/worker.js', type: 'module' },
  errors: {
    // The worker ends a type error, or an uncaught error, with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error: "TS2322: Type 'string' is not assignable to type 'number'."
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
