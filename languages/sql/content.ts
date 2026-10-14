// SQL's koans and editor mode: loaded only when someone opens SQL (see pack.ts).
import { sql, SQLite } from '@codemirror/lang-sql';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/sql.json';

export default {
  manifest: manifest as Manifest,
  highlight: sql({ dialect: SQLite }),
} satisfies LanguageContent;
