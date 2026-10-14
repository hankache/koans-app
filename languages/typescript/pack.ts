// TypeScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'typescript',
  name: 'TypeScript',
  tagline: 'Learn TypeScript’s types, from annotations to generics',
  testedWith: 'Node’s `assert` assertions, plus `assert.type` for types',
  worker: { url: 'runtime/typescript/worker.js', type: 'module' },
  errors: {
    // The worker ends a type error, or an uncaught error, with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error: "TS2322: Type 'string' is not assignable to type 'number'."
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
