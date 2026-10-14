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
  worker: { url: 'runtime/raku/worker.js', type: 'classic' },
  errors: {
    // "===SORRY!=== Parse error at line 3: …" for compile errors, "in block <unit> at web line 3"
    // in an exception's backtrace.
    line: /(?:at web line|at line) (\d+)/,
    message: ([first]) => first.replace(/^===SORRY!=== /, '').replace(/ at line \d+/, ''),
    recursionLimit: 200,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
