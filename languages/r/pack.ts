// R for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'r',
  name: 'R',
  tagline: 'Learn R from its vectors to its data frames',
  testedWith: { name: 'testthat', url: 'https://testthat.r-lib.org' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#2b5f9e', dark: '#8db5e6' },
    emblem:
      '<path d="M19.5 32.5 V55.5 H46" fill="none" stroke="{F}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><g fill="{F}"><circle cx="25" cy="49.5" r="2.5"/><circle cx="29.5" cy="45" r="2.5"/><circle cx="34" cy="46.8" r="2.5"/><circle cx="37.5" cy="40" r="2.5"/><circle cx="42.5" cy="37.5" r="2.5"/></g><path d="M22.5 51.5 L45 35" fill="none" stroke="{F}" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="0.1 3.6"/>',
  },
  about:
    'R is a language made by statisticians for working with data. Every value is a vector, missing data is built in, and a data frame holds a table you can filter, group and summarize in a line or two. Scientists, analysts and researchers use it to clean data, run statistics and draw charts. These koans cover vectors, factors, lists and data frames, functions and the apply family, and R’s own object systems, S3 and S4.',
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
  // The koan as a file of its test framework, named its way (testthat: test-name.R), on the editor's bar.
  testFile: slug => `test-${slug}.R`,
  worker: { url: 'runtime/r/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.R:3".
    line: /koan\.R:(\d+)/,
    // And starts it with the error: "Error: object 'x' not found".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
