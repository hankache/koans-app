// LANGUAGE for the app. Its build tools' side is node.mjs.
// Copied from languages/_template: replace every LANGUAGE, lang-id and TODO.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'lang-id',
  name: 'LANGUAGE',
  // Shown on the home page: "<tagline>, in N koans." and "<tagline> through N browser-based koans."
  tagline: 'Learn LANGUAGE from TODO to TODO',
  // Finishes "fix failing tests written with …"; `code` in backticks.
  testedWith: 'TODO',
  // Its tile on the home page: a short monogram, an accent for each theme (with 4.5:1 contrast on
  // the page's light and dark backgrounds), and a line of its koans' code.
  look: { monogram: 'TODO', accent: { light: '#000000', dark: '#ffffff' } },
  sample: 'TODO',
  // Optional: teaser, a one-blank koan for the home page's "try one" (see src/lib/language.ts).
  // Optional: art: { logo: { src, alt }, celebration: 'folder/' }. Without it, the gateless gate stands in.
  worker: { url: 'runtime/lang-id/worker.js', type: 'module' }, // or 'classic' for importScripts()
  errors: {
    // TODO: finds the line (as the interpreter counts it, prelude included) in an uncaught error.
    line: /line (\d+)/,
    // TODO: the readable message, from all the error's stderr lines.
    message: ([first]) => first,
    // Optional: recursionLimit, measured in the browser.
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
