// Raku for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'raku',
  name: 'Raku',
  tagline: 'Learn Raku from syntax to culture',
  testedWith: 'Raku’s `Test` module',
  art: {
    logo: { src: 'logo.webp', alt: 'Raku Koans: a butterfly beside a torii gate framing a question mark' },
    celebration: 'anim/',
  },
  look: { monogram: 'Ra', accent: { light: '#b8327a', dark: '#f07cb6' } },
  sample: "is 1 + 1, 2, 'is compares';",
  worker: { url: 'runtime/raku/worker.js', type: 'classic' },
  errors: {
    // "===SORRY!=== Parse error at line 3: …" for compile errors, "in block <unit> at web line 3"
    // in an exception's backtrace.
    line: /(?:at web line|at line) (\d+)/,
    message: ([first]) => first.replace(/^===SORRY!=== /, '').replace(/ at line \d+/, ''),
    // Measured with Raku++ 5.4.1: 1,000 levels work in Chrome (2,000 in Firefox).
    recursionLimit: 1000,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
