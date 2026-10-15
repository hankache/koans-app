// Ruby for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'ruby',
  name: 'Ruby',
  tagline: 'Learn Ruby from its objects to its blocks',
  testedWith: 'RSpec-style `expect(…).to eq(…)`',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#9a6535', dark: '#d49a66' },
    emblem:
      '<path d="M26.4 35.6 H37.6 L41.4 41.2 L32 55.4 L22.6 41.2 Z" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M22.6 41.2 H41.4 M26.4 35.6 L28.6 41.2 L32 35.6 L35.4 41.2 L37.6 35.6 M28.6 41.2 L32 55.4 L35.4 41.2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>',
  },
  about:
    'Ruby is a dynamic, object-oriented language designed for programmer happiness, where everything is an object and blocks are everywhere. It\'s best known for Ruby on Rails and for expressive, readable code. These koans cover its objects, collections, blocks, classes and modules, up to metaprogramming.',
  site: { url: 'https://www.ruby-lang.org', label: 'ruby-lang.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Matz is nice, so we are nice.', 'Optimized for happiness.'],
  sample: 'expect(1 + 1).to eq(2)',
  teaser: { before: 'expect(-7 % 3).to eq(', after: ')', choices: ['-1', '1', '2'], answer: '2', why: 'Ruby’s % takes the sign of the divisor.' },
  worker: { url: 'runtime/ruby/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.rb:3".
    line: /koan\.rb:(\d+)/,
    // And starts it with the error: "NameError: undefined local variable or method 'x' for main".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
