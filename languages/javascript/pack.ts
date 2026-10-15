// JavaScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'javascript',
  name: 'JavaScript',
  tagline: 'Learn modern JavaScript from its values to async functions',
  testedWith: 'Vitest-style `expect` (same API as Jest)',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#8a6a1f', dark: '#e2bf72' },
    emblem:
      '<g fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M28.6 34 C25.6 34 25.8 36.2 25.8 38.8 C25.8 41.8 25.4 44.2 23.2 44.6 C25.4 45 25.8 47.4 25.8 50.4 C25.8 53 25.6 55.2 28.6 55.2"/><path d="M35.4 34 C38.4 34 38.2 36.2 38.2 38.8 C38.2 41.8 38.6 44.2 40.8 44.6 C38.6 45 38.2 47.4 38.2 50.4 C38.2 53 38.4 55.2 35.4 55.2"/></g><circle cx="32" cy="44.6" r="1.9" fill="currentColor"/>',
  },
  about:
    'JavaScript is the language of the web: every browser runs it, and runtimes like Node.js run it on servers. It\'s dynamic and built on objects, with first-class functions and asynchronous code at its heart. These koans cover its values and quirks, arrays and objects, functions and classes, iterators and async code.',
  site: { url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', label: 'JavaScript on MDN' },
  sample: 'expect(1 + 1).toBe(2);',
  teaser: { before: "expect('5' + 2).toBe(", after: ');', choices: ['7', "'52'", 'NaN'], answer: "'52'", why: 'With a string on either side, + joins strings.' },
  worker: { url: 'runtime/javascript/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error itself: "TypeError: x is not a function".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
