// Ruby for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'ruby',
  name: 'Ruby',
  tagline: 'Learn Ruby from its objects to its blocks',
  testedWith: 'RSpec-style `expect(…).to eq(…)`',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#9a6535', dark: '#d49a66' },
    emblem:
      '<path d="M24 34 H40 L46.5 41.5 L32 56 L17.5 41.5 Z" fill="{F}" stroke="{F}" stroke-width="1.5" stroke-linejoin="round"/><g fill="none" stroke="{C}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M18.5 41.5 H45.5"/><path d="M24 34.5 L27.5 41.5 L32 54.5 L36.5 41.5 L40 34.5"/><path d="M27.5 41.5 L32 34.5 L36.5 41.5"/></g>',
  },
  about:
    'Ruby was designed to make programmers happy: its code reads naturally, and everything in it, even a number, is an object. It powers many web applications through its popular web framework, and it’s loved for scripts and tools too. Blocks, small pieces of code handed to methods, are everywhere. These koans cover objects, strings and collections, blocks and procs, classes and modules, and metaprogramming.',
  site: { url: 'https://www.ruby-lang.org', label: 'ruby-lang.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Matz is nice, so we are nice.', 'Optimized for happiness.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Made for programmer happiness',
  journey: 'From blocks and objects to modules and metaprogramming.',
  framework: 'RSpec',
  kinds: ['start', 'web', 'automate'],
  teasers: [
    { before: 'expect(-7 % 3).to eq(', after: ')', choices: ['-1', '1', '2'], answer: '2', why: 'Ruby’s % takes the sign of the divisor.' },
    { before: 'expect(nil.to_a).to eq(', after: ')', choices: ['nil', '[]', '[nil]'], answer: '[]', why: 'nil converts to an empty array.' },
  ],
  worker: { url: 'runtime/ruby/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.rb:3".
    line: /koan\.rb:(\d+)/,
    // And starts it with the error: "NameError: undefined local variable or method 'x' for main".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
