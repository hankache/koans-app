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
  // Its look: an accent for each theme (with 4.5:1 contrast on the page's light and dark
  // backgrounds), and its emblem's symbol, SVG drawn in currentColor in the doorway of a 64-unit box
  // (see src/components/Emblem.svelte and the other packs).
  look: { accent: { light: '#000000', dark: '#ffffff' }, emblem: '<circle cx="32" cy="44" r="8" fill="currentColor"/>' },
  // Two or three sentences on the language, ending with what its koans cover; and its official site.
  about: 'TODO',
  site: { url: 'https://TODO', label: 'TODO' },
  // A few lines in the language's own voice, said now and then when a koan passes.
  cheers: ['TODO'],
  // Optional: mascot, an emoji shown when its whole path is walked; without it, its emblem.
  sample: 'TODO',
  // Optional: teaser, a one-blank koan for the home page's "try one" (see src/lib/language.ts).
  // Optional: art: { celebration: 'folder/' }, the layers of its "passed" animation. Without it, the gate stands in.
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
