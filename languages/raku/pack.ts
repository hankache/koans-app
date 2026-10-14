// Raku for the app. Its build tools' side is node.mjs.
import type { LanguagePack, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/raku.json';
import { raku } from './highlight';

export default {
  id: 'raku',
  name: 'Raku',
  tagline: 'Learn Raku from syntax to culture',
  testLibrary: 'Test',
  testLibraryOwner: 'Raku’s',
  art: {
    logo: { src: 'logo.webp', alt: 'Raku Koans: a butterfly beside a torii gate framing a question mark' },
    celebration: 'anim/',
  },
  worker: 'runtime/raku/worker.js',
  manifest: manifest as Manifest,
  highlight: raku,
  errors: {
    // "===SORRY!=== Parse error at line 3: …" for compile errors, "in block <unit> at web line 3"
    // in an exception's backtrace.
    line: /(?:at web line|at line) (\d+)/,
    message: first => first.replace(/^===SORRY!=== /, '').replace(/ at line \d+/, ''),
    recursionLimit: 200,
  },
} satisfies LanguagePack;
