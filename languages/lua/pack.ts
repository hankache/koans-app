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
  sample: 'assert.are.equal(2, 1 + 1)',
  worker: { url: 'runtime/lua/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.lua:3".
    line: /koan\.lua:(\d+)/,
    // And starts it with Lua's message: "attempt to call a nil value (global 'nope')".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
