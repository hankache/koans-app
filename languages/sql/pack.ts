// SQL for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'sql',
  name: 'SQL',
  tagline: 'Learn SQL from SELECT to window functions',
  testedWith: 'the rows each query should return, in `-- expect:` comments',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#5f5c3a', dark: '#b8b27f' },
    emblem:
      '<path d="M20 35.5 A12 4.5 0 0 1 44 35.5 V51.5 A12 4.5 0 0 1 20 51.5 Z" fill="{F}"/><g fill="none" stroke="{C}" stroke-width="1.6"><path d="M20.8 35.5 A11.2 4 0 0 0 43.2 35.5"/><path d="M20 41.5 A12 4.5 0 0 0 44 41.5"/><path d="M20 46.8 A12 4.5 0 0 0 44 46.8"/></g>',
  },
  about:
    'SQL is the language of relational databases: you describe the rows you want, and the database works out how to find them. These koans run on SQLite, the most widely deployed database engine, and cover queries, grouping, joins, changing data, subqueries, window functions and a few classic puzzles.',
  site: { url: 'https://sqlite.org', label: 'sqlite.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['1 row affected: yours.', 'COMMIT.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Ask your data questions',
  journey: 'From `SELECT` to joins, window functions and classic puzzles.',
  framework: '-- expect:',
  kinds: ['data'],
  teasers: [
    { context: 'SELECT NULL + 1;', before: '-- expect: ', after: '', choices: ['1', 'NULL', '0'], answer: 'NULL', why: 'Anything combined with NULL is NULL.' },
    { context: 'SELECT 7 / 2;', before: '-- expect: ', after: '', choices: ['3.5', '3', '4'], answer: '3', why: 'An integer divided by an integer stays an integer.' },
  ],
  worker: { url: 'runtime/sql/worker.js', type: 'module' },
  errors: {
    // The worker ends a failed statement with its line: "    at koan.sql:3".
    line: /koan\.sql:(\d+)/,
    // And starts it with SQLite's message: "no such table: nowhere".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
