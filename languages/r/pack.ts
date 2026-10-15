// R for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'r',
  name: 'R',
  tagline: 'Learn R from its vectors to its data frames',
  testedWith: 'testthat’s `test_that` and `expect_equal`',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#2b5f9e', dark: '#8db5e6' },
    emblem:
      '<g fill="currentColor"><rect x="23.4" y="45.6" width="4.2" height="9.4" rx="0.8"/><rect x="29.9" y="40.6" width="4.2" height="14.4" rx="0.8"/><rect x="36.4" y="43" width="4.2" height="12" rx="0.8"/></g><path d="M22.6 41.4 L30.4 35.4 L35.2 38.2 L41.6 33.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  about:
    'R is the language of statistics and data analysis: vectors are its basic values, missing data is built in, and data frames hold tables. Statisticians, scientists and analysts use it to explore, model and plot data. These koans cover vectors, factors, lists, data frames, functions and the apply family, and R’s own ideas about objects.',
  site: { url: 'https://www.r-project.org', label: 'r-project.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Statistically significant progress.', 'Your confidence interval narrows.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Made for statistics and data',
  journey: 'From vectors to data frames, the apply family and S4 objects.',
  framework: 'testthat',
  kinds: ['data'],
  teasers: [
    { before: 'expect_equal(round(2.5), ', after: ')', choices: ['2', '3', '2.5'], answer: '2', why: 'R rounds halves to the even neighbour.' },
    { before: 'expect_equal(c(1, 2) + 1:4, ', after: ')', choices: ['c(2, 4, 4, 6)', 'c(2, 4)', 'c(2, 4, 3, 4)'], answer: 'c(2, 4, 4, 6)', why: 'The shorter vector is recycled.' },
  ],
  worker: { url: 'runtime/r/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.R:3".
    line: /koan\.R:(\d+)/,
    // And starts it with the error: "Error: object 'x' not found".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
