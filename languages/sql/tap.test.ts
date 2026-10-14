// What the SQL worker really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('sql');
const PEOPLE = "CREATE TABLE people (name TEXT, age INTEGER);\nINSERT INTO people VALUES ('Ada', 36), ('Alan', 41);\n";

describe('parseRun on real SQL output', () => {
  test('passing koan, with descriptions from the comments above', async () => {
    const r = await report(`${PEOPLE}-- the oldest\nSELECT name FROM people ORDER BY age DESC LIMIT 1;\n-- expect: 'Alan'\n`);
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.description)).toEqual(['the oldest']);
  });

  test('a blank fails on its own line, in the query or in the expectation', async () => {
    for (const [code, line] of [
      [`${PEOPLE}-- b\nSELECT name FROM people ORDER BY age ___ LIMIT 1;\n-- expect: 'Alan'\n`, 4],
      [`${PEOPLE}-- b\nSELECT count(*) FROM people;\n-- expect: ___\n`, 5],
    ] as const) {
      const r = await report(code);
      if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ description: 'b', line, blank: true });
    }
  });

  test('wrong rows show the answer against what SQLite returned, in the same notation', async () => {
    const r = await report(`${PEOPLE}-- rows\nSELECT name, age FROM people ORDER BY age;\n-- expect: ('Ada', 36), ('Alan', 99)\n`);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 5, answer: "('Ada', 36), ('Alan', 99)", actual: "('Ada', 36), ('Alan', 41)" });
  });

  test('a query that fails is a failed test, and the koan carries on', async () => {
    const r = await report(`${PEOPLE}-- typo\nSELECT nmae FROM people;\n-- expect: 'Ada'\n-- next\nSELECT 1;\n-- expect: 1\n`);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure.diag).toContain('SQLite says: no such column: nmae');
    expect(r.tests.map(t => t.ok)).toEqual([false, true]);
  });

  test('an expected error passes when the statement fails as expected', async () => {
    const r = await report("CREATE TABLE t (x TEXT NOT NULL);\n-- refused\nINSERT INTO t VALUES (NULL);\n-- expect: error: NOT NULL\n");
    expect(r.status).toBe('passed');
  });

  test('a failing statement outside the tests stops the koan at its line', async () => {
    const r = await report(`${PEOPLE}INSERT INTO nowhere VALUES (1);\nSELECT 1; -- expect: 1\n`);
    expect(r).toMatchObject({ status: 'error', line: 3, message: 'no such table: nowhere' });
  });

  test("a SELECT without an expectation shows its rows as the learner's output", async () => {
    const r = await report(`${PEOPLE}SELECT name, age FROM people ORDER BY age;\nSELECT 1; -- expect: 1\n`);
    expect(r).toMatchObject({ status: 'passed', output: ['name | age', 'Ada | 36', 'Alan | 41'] });
  });

  test('every run starts from an empty database', async () => {
    await report('CREATE TABLE leftover (x);\nSELECT 1; -- expect: 1\n');
    expect((await report("-- fresh\nSELECT count(*) FROM sqlite_master;\n-- expect: 0\n")).status).toBe('passed');
  });
});
