import { expect, test } from 'vitest';
import { exportName, makeExport, readImport } from '../src/lib/transfer';

const entry = { status: 'passed', code: 'x', attempts: 2, passedAt: '2026-10-01T10:00:00.000Z', updatedAt: '2026-10-01T10:00:00.000Z' } as const;

test('an export reads back as it was', () => {
  const file = makeExport({ raku: { 'numbers/division': entry } }, new Date('2026-10-14T12:00:00Z'));
  expect(file).toMatchObject({ format: 'koans.app/progress', version: 1, exportedAt: '2026-10-14T12:00:00.000Z' });
  expect(readImport(JSON.stringify(file), ['raku', 'python'])).toEqual({
    languages: { raku: { 'numbers/division': entry } },
    skipped: 0,
    unknown: [],
  });
});

test('the file is named by its date', () => {
  expect(exportName(new Date('2026-10-14T23:00:00Z'))).toBe('koans-app-progress-2026-10-14.json');
});

test('anything else is refused with a message for people', () => {
  expect(() => readImport('not json', ['raku'])).toThrow(/not JSON/);
  expect(() => readImport('{"hello": 1}', ['raku'])).toThrow(/not a koans.app progress file/);
  expect(() => readImport(JSON.stringify({ ...makeExport({}), version: 2 }), ['raku'])).toThrow(/newer version/);
});

test('damaged entries and unknown languages are left out, and counted', () => {
  const file = makeExport({
    raku: {
      good: entry,
      'no status': { ...entry, status: 'won' },
      'bad date': { ...entry, updatedAt: 'yesterday' },
      'not an entry': 'hello',
    },
    cobol: { 'a/b': entry },
  } as never);
  expect(readImport(JSON.stringify(file), ['raku'])).toEqual({ languages: { raku: { good: entry } }, skipped: 3, unknown: ['cobol'] });
});

test('only the known fields are kept', () => {
  const file = makeExport({ raku: { k: { ...entry, extra: '<script>' } } } as never);
  expect(readImport(JSON.stringify(file), ['raku']).languages.raku.k).toEqual(entry);
});
