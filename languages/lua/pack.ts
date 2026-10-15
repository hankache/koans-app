// Lua for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'lua',
  name: 'Lua',
  tagline: 'Learn Lua from its tables to its metatables',
  testedWith: { name: 'busted', url: 'https://lunarmodules.github.io/busted/' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#4e606a', dark: '#9fb2bd' },
    emblem:
      '<circle cx="31" cy="45.5" r="11" fill="{F}"/><circle cx="37.5" cy="40" r="9" fill="{C}"/><circle cx="43.5" cy="33" r="2.8" fill="{F}"/>',
  },
  about:
    'Lua is a small, fast language designed to live inside other programs. Games, text editors, databases and network tools use it to let people script and extend them. It keeps things simple: a handful of ideas, and one data structure, the table, that serves as array, dictionary, object and module. These koans cover tables, functions and closures, metatables for building your own objects, coroutines, and the standard library.',
  site: { url: 'https://www.lua.org', label: 'lua.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['The moon waxes.', 'Lua shines a little brighter.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Tiny, fast, made to embed',
  journey: 'From tables, its one data structure, to metatables and coroutines.',
  framework: 'busted',
  kinds: ['start', 'automate', 'think'],
  teasers: [
    { before: 'assert.are.equal(', after: ', #\'héllo\')', choices: ['5', '6', '4'], answer: '6', why: '# counts bytes, and é takes two.' },
    { before: 'assert.are.equal(', after: ', 7 // 2)', choices: ['3.5', '3', '4'], answer: '3', why: '// is floor division.' },
  ],
  // The koan as a file of its test framework, named its way (busted: name_spec.lua), on the editor's bar.
  testFile: slug => `${slug.replaceAll('-', '_')}_spec.lua`,
  worker: { url: 'runtime/lua/worker.js', type: 'module' },
  errors: {
    // The worker ends an uncaught error with the koan's line: "    at koan.lua:3".
    line: /koan\.lua:(\d+)/,
    // And starts it with Lua's message: "attempt to call a nil value (global 'nope')".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
