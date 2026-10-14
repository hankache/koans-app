// Lua for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'lua',
  name: 'Lua',
  tagline: 'Learn Lua from its tables to its metatables',
  testedWith: 'busted’s assertions, like `assert.are.equal`',
  look: { monogram: 'Lua', accent: { light: '#4e606a', dark: '#9fb2bd' } },
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
