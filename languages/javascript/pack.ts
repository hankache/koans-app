// JavaScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'javascript',
  name: 'JavaScript',
  tagline: 'Learn modern JavaScript from its values to async functions',
  testedWith: 'the assertions of Node’s `assert` module',
  look: { monogram: 'JS', accent: { light: '#8a6a1f', dark: '#e2bf72' } },
  sample: 'assert.equal(1 + 1, 2);',
  teaser: { before: "assert.equal('5' + 2, ", after: ');', choices: ['7', "'52'", 'NaN'], answer: "'52'", why: 'With a string on either side, + joins strings.' },
  worker: { url: 'runtime/javascript/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error itself: "TypeError: x is not a function".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
