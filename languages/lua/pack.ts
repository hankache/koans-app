// Lua for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'lua',
  name: 'Lua',
  tagline: 'Learn Lua from its tables to its metatables',
  testedWith: 'busted’s assertions, like `assert.are.equal`',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#4e606a', dark: '#9fb2bd' },
    emblem:
      '<path d="M30.38 36.02 A9 9 0 1 0 39.55 47.81 A7.5 7.5 0 0 1 30.38 36.02 Z" fill="currentColor"/><circle cx="39.2" cy="35.4" r="2.1" fill="currentColor"/>',
  },
  about:
    'Lua is a small, fast scripting language made to be embedded in other programs: games, editors like Neovim, network software. One data structure, the table, does the work of arrays, records, objects and modules. These koans cover tables, functions and closures, metatables, coroutines and the standard library.',
  site: { url: 'https://www.lua.org', label: 'lua.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['The moon waxes.', 'Lua shines a little brighter.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Small, fast, embeddable',
  journey: 'From tables to metatables and coroutines.',
  framework: 'busted',
  kinds: ['start', 'automate', 'think'],
  teasers: [
    { before: 'assert.are.equal(', after: ', #\'héllo\')', choices: ['5', '6', '4'], answer: '6', why: '# counts bytes, and é takes two.' },
    { before: 'assert.are.equal(', after: ', 7 // 2)', choices: ['3.5', '3', '4'], answer: '3', why: '// is floor division.' },
  ],
  worker: { url: 'runtime/lua/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.lua:3".
    line: /koan\.lua:(\d+)/,
    // And starts it with Lua's message: "attempt to call a nil value (global 'nope')".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
