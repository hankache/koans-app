// JavaScript for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'javascript',
  name: 'JavaScript',
  tagline: 'Learn modern JavaScript from its values to async functions',
  testedWith: { name: 'Vitest', url: 'https://vitest.dev' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#8a6a1f', dark: '#e2bf72' },
    emblem:
      '<g fill="none" stroke="{F}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M27 32.5 C23 32.5 23.5 35.5 23.5 38.5 C23.5 41.5 23 43.5 20 44 C23 44.5 23.5 46.5 23.5 49.5 C23.5 52.5 23 55.5 27 55.5"/><path d="M37 32.5 C41 32.5 40.5 35.5 40.5 38.5 C40.5 41.5 41 43.5 44 44 C41 44.5 40.5 46.5 40.5 49.5 C40.5 52.5 41 55.5 37 55.5"/></g><circle cx="32" cy="44" r="2.6" fill="{F}"/>',
  },
  about:
    'JavaScript is the language every web browser understands. It makes pages interactive, and it runs on servers and in tools and apps too. It’s flexible and forgiving: functions are values, objects are everywhere, and much of its power is in handling things that happen later, like clicks and network replies. These koans start with its values and famous quirks, and go on to arrays and objects, closures, classes, iterators and async code.',
  site: { url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', label: 'JavaScript on MDN' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Strictly equal, and true.', 'The event loop smiles.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'The browser’s own language',
  journey: 'From its famous quirks to closures, classes and `async`/`await`.',
  framework: 'Vitest',
  kinds: ['start', 'web'],
  teasers: [
    { before: 'expect(\'5\' + 2).toBe(', after: ');', choices: ['7', '\'52\'', 'NaN'], answer: '\'52\'', why: 'With a string on either side, + joins strings.' },
    { before: 'expect([] + []).toBe(', after: ');', choices: ['\'\'', '[]', '0'], answer: '\'\'', why: 'Both arrays become empty strings first.' },
  ],
  worker: { url: 'runtime/javascript/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.js:3".
    line: /koan\.js:(\d+)/,
    // And starts it with the error itself: "TypeError: x is not a function".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
