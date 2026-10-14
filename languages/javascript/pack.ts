// JavaScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'javascript',
  name: 'JavaScript',
  tagline: 'Learn modern JavaScript from its values to async functions',
  testedWith: 'the assertions of Node’s `assert` module',
  worker: { url: 'runtime/javascript/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error itself: "TypeError: x is not a function".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
