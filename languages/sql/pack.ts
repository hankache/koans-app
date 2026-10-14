// SQL for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'sql',
  name: 'SQL',
  tagline: 'Learn SQL from SELECT to window functions',
  testedWith: 'the rows each query should return, in `-- expect:` comments',
  worker: { url: 'runtime/sql/worker.js', type: 'module' },
  errors: {
    // The worker ends a failed statement with its line: "    at koan.sql:3".
    line: /koan\.sql:(\d+)/,
    // And starts it with SQLite's message: "no such table: nowhere".
    message: ([first]) => first,
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
