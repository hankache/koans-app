// TypeScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'typescript',
  name: 'TypeScript',
  tagline: 'Learn TypeScript’s types, from annotations to generics',
  testedWith: 'Vitest’s `expect` and `expectTypeOf`',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#173f4d', dark: '#7fb0c4' },
    emblem:
      '<path d="M24.6 37.4 H37.8 L42 44.6 L37.8 51.8 H24.6 Q23.2 51.8 23.2 50.4 V38.8 Q23.2 37.4 24.6 37.4 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="36.6" cy="44.6" r="1.7" fill="currentColor"/><path d="M27 41.4 H32.6 M29.8 41.4 V48.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  },
  about:
    'TypeScript is JavaScript with static types, checked by a compiler before the code runs and then erased. Its type system describes JavaScript as it\'s really written, with unions, narrowing, generics and types computed from other types. These koans cover all of that, from the first annotation to conditional and mapped types.',
  site: { url: 'https://www.typescriptlang.org', label: 'typescriptlang.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['The compiler is satisfied.', 'Not an `any` in sight.'],
  sample: 'expectTypeOf(age).toEqualTypeOf<36>();',
  worker: { url: 'runtime/typescript/worker.js', type: 'module' },
  errors: {
    // The worker ends a type error, or an uncaught error, with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error: "TS2322: Type 'string' is not assignable to type 'number'."
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
