// What Raku++ really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('raku');

describe('parseRun on real Raku output', () => {
  test('passing koan', async () => {
    const r = await report("is 1 + 1, 2, 'one';\nis 2 + 2, 4, 'two';\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line', async () => {
    const r = await report("is 1 + 1, 2, 'one';\nis 2 + 2, ___, 'two';\n");
    expect(r.status).toBe('failed');
    if (r.status !== 'failed') return;
    expect(r.failure).toMatchObject({ n: 2, description: 'two', line: 2, blank: true });
  });

  test('a wrong answer shows the answer against what Raku computed', async () => {
    const r = await report("is 1 + 1, 2, 'one';\nis 2 + 2, 5, 'two';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2, blank: false, answer: "'5'", actual: "'4'" });
  });

  test('is-deeply diagnostics are read too', async () => {
    const r = await report("is-deeply (1, 2).List, (1, 3), 'list';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, answer: '(1, 3)', actual: '(1, 2)' });
  });

  test('values that span several lines stay whole', async () => {
    const r = await report("is \"a\\nb\", \"a\\nc\", 'multi-line';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: "'a\nc'", actual: "'a\nb'" });
  });

  test('a failure inside a subtest reports the inner line and description', async () => {
    const code = "subtest 'group', {\n    is 1, 1, 'inner ok';\n    is 2, ___, 'inner blank';\n};\n";
    const r = await report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'group › inner blank', line: 3, blank: true });
  });

  test('a compile error points at the learner line, without the SORRY banner', async () => {
    const r = await report("is 1, 1, 'fine';\nmy $x = ;\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Parse error: Malformed initializer' });
  });

  test('an exception outside any test is an error at its line', async () => {
    const r = await report("is 1, 1, 'fine';\ndie 'boom';\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'boom' });
  });

  test('todo failures and skips do not fail the koan', async () => {
    const r = await report("todo 'later';\nis 1, 2, 'not yet';\nskip 'nope', 1;\nis 1, 1, 'fine';\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.description)).toEqual(['not yet', 'skipped: nope', 'fine']);
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("say 'hello';\nis 1, 1, 'fine';\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });
});
