// Raku for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'raku',
  name: 'Raku',
  tagline: 'Learn Raku from syntax to culture',
  testedWith: 'Raku’s `Test` module',
  art: { celebration: 'anim/' },
  // Camelia, Raku's butterfly, belongs to the Raku path alone; -Ofun is Raku's motto.
  cheers: ['Camelia approves.', 'Optimized for fun.'],
  mascot: '🦋',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#b8327a', dark: '#f07cb6' },
    emblem:
      '<g fill="currentColor"><path d="M31.2 43.2 C28.6 36.4 23 33.6 23.6 39.2 C24 42.4 27.2 43.8 31.2 44.2 Z"/><path d="M31.2 45.2 C27.4 45.6 24.6 48.2 25.6 51.6 C26.6 54.2 30.2 51.2 31.2 46.8 Z"/><path d="M32.8 43.2 C35.4 36.4 41 33.6 40.4 39.2 C40 42.4 36.8 43.8 32.8 44.2 Z"/><path d="M32.8 45.2 C36.6 45.6 39.4 48.2 38.4 51.6 C37.4 54.2 33.8 51.2 32.8 46.8 Z"/></g><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M32 41.6 V51.4" stroke-width="1.9"/><path d="M31.4 41.4 Q30 37.6 28.2 36.4 M32.6 41.4 Q34 37.6 35.8 36.4" stroke-width="1.1"/></g>',
  },
  about:
    'Raku is an expressive, multi-paradigm language from the Perl family, with gradual typing, grammars for parsing, lazy lists, junctions and concurrency built in. It began as Perl 6 and took its own name in 2019. These koans walk from its syntax and operators to its objects, grammars and culture.',
  site: { url: 'https://raku.org', label: 'raku.org' },
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Expressive and optimized for fun',
  journey: 'From sigils and junctions to lazy lists and grammars.',
  framework: 'Test',
  kinds: ['start', 'automate', 'think'],
  teasers: [
    { before: 'is 0.1 + 0.2, ', after: ', \'exact\';', choices: ['0.3', '0.30000000000000004', 'False'], answer: '0.3', why: 'Raku keeps 0.1 as an exact fraction.' },
    { before: 'is \'ab\' x 3, ', after: ', \'repeat\';', choices: ['\'ababab\'', '\'ab3\'', '(\'ab\', \'ab\', \'ab\')'], answer: '\'ababab\'', why: 'x repeats a string; xx would make a list.' },
  ],
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
