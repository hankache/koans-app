// SQL for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'sql',
  name: 'SQL',
  tagline: 'Learn SQL from SELECT to window functions',
  testedWith: 'the rows each query should return, in `-- expect:` comments',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#5f5c3a', dark: '#b8b27f' },
    emblem:
      '<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><ellipse cx="32" cy="37" rx="8.4" ry="3.2"/><path d="M23.6 37 V52.2 A8.4 3.2 0 0 0 40.4 52.2 V37"/><path d="M23.6 44.6 A8.4 3.2 0 0 0 40.4 44.6"/></g>',
  },
  about:
    'SQL is the language of relational databases: you describe the rows you want, and the database works out how to find them. These koans run on SQLite, the most widely deployed database engine, and cover queries, grouping, joins, changing data, subqueries, window functions and a few classic puzzles.',
  site: { url: 'https://sqlite.org', label: 'sqlite.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['1 row affected: yours.', 'COMMIT.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Asking your data questions',
  journey: 'From `SELECT` to joins, window functions and puzzles.',
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
