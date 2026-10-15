// Raku for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'raku',
  name: 'Raku',
  tagline: 'Learn Raku from syntax to culture',
  testedWith: { name: 'Raku’s Test module', url: 'https://docs.raku.org/type/Test' },
  art: { celebration: 'anim/' },
  // Camelia, Raku's butterfly, belongs to the Raku path alone; -Ofun is Raku's motto.
  cheers: ['Camelia approves.', 'Optimized for fun.'],
  mascot: '🦋',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#b8327a', dark: '#f07cb6' },
    emblem:
      '<g><path d="M31 43 C29.5 36 25 31.4 20.6 31.6 C17.2 31.8 15.8 35.4 17.6 38.8 C19.6 42.4 24.6 44.2 31 44.4 Z" fill="{F}"/><path d="M31 45.8 C26 45.8 21.6 48 21.4 51.6 C21.2 54.6 24.4 56 27.2 54.6 C29.4 53.4 30.6 50.4 31 47.4 Z" fill="{F}"/><circle cx="22.4" cy="36.6" r="2.7" fill="{C}"/><circle cx="22.4" cy="36.6" r="1.3" fill="{F}"/><circle cx="25.4" cy="51.4" r="1.3" fill="{C}"/><path d="M31.4 38.4 C30.4 35 28.8 33.2 26.8 32.6" fill="none" stroke="{F}" stroke-width="1.1" stroke-linecap="round"/><circle cx="26.5" cy="32.5" r="1.1" fill="{F}"/></g><g transform="translate(64 0) scale(-1 1)"><path d="M31 43 C29.5 36 25 31.4 20.6 31.6 C17.2 31.8 15.8 35.4 17.6 38.8 C19.6 42.4 24.6 44.2 31 44.4 Z" fill="{F}"/><path d="M31 45.8 C26 45.8 21.6 48 21.4 51.6 C21.2 54.6 24.4 56 27.2 54.6 C29.4 53.4 30.6 50.4 31 47.4 Z" fill="{F}"/><circle cx="22.4" cy="36.6" r="2.7" fill="{C}"/><circle cx="22.4" cy="36.6" r="1.3" fill="{F}"/><circle cx="25.4" cy="51.4" r="1.3" fill="{C}"/><path d="M31.4 38.4 C30.4 35 28.8 33.2 26.8 32.6" fill="none" stroke="{F}" stroke-width="1.1" stroke-linecap="round"/><circle cx="26.5" cy="32.5" r="1.1" fill="{F}"/></g><rect x="30.7" y="38.4" width="2.6" height="16" rx="1.3" fill="{F}"/>',
  },
  about:
    'Raku is an expressive language designed to make hard things easy and to be fun. It has gradual typing, grammars for parsing built in, lazy and infinite lists, junctions that test many values at once, and easy concurrency. It’s a language you can write in many styles: a quick script, carefully typed code, or something in between. These koans walk from its syntax and operators through objects, roles and functional programming, to regexes and grammars.',
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
