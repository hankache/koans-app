import { describe, expect, test } from 'vitest';
import { parseRun } from '../src/lib/tap';
import type { RunResult } from '../src/lib/runtime/wasm-runtime';
import { PRELUDE_LINES, report } from './raku';

// Real runs: what Raku++ prints, read the way the result panel reads it.
describe('parseRun on real Raku output', () => {
  test('passing koan', () => {
    const r = report("is 1 + 1, 2, 'one';\nis 2 + 2, 4, 'two';\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line', () => {
    const r = report("is 1 + 1, 2, 'one';\nis 2 + 2, ___, 'two';\n");
    expect(r.status).toBe('failed');
    if (r.status !== 'failed') return;
    expect(r.failure).toMatchObject({ n: 2, description: 'two', line: 2, blank: true });
  });

  test('a wrong answer shows the answer against what Raku computed', () => {
    const r = report("is 1 + 1, 2, 'one';\nis 2 + 2, 5, 'two';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2, blank: false, answer: "'5'", actual: "'4'" });
  });

  test('is-deeply diagnostics are read too', () => {
    const r = report("is-deeply (1, 2).List, (1, 3), 'list';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, answer: '(1, 3)', actual: '(1, 2)' });
  });

  test('values that span several lines stay whole', () => {
    const r = report("is \"a\\nb\", \"a\\nc\", 'multi-line';\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: "'a\nc'", actual: "'a\nb'" });
  });

  test('a failure inside a subtest reports the inner line and description', () => {
    const code = "subtest 'group', {\n    is 1, 1, 'inner ok';\n    is 2, ___, 'inner blank';\n};\n";
    const r = report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'group › inner blank', line: 3, blank: true });
  });

  test('a compile error points at the learner line, without the SORRY banner', () => {
    const r = report("is 1, 1, 'fine';\nmy $x = ;\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Parse error: Malformed initializer' });
  });

  test('an exception outside any test is an error at its line', () => {
    const r = report("is 1, 1, 'fine';\ndie 'boom';\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'boom' });
  });

  test('todo failures and skips do not fail the koan', () => {
    const r = report("todo 'later';\nis 1, 2, 'not yet';\nskip 'nope', 1;\nis 1, 1, 'fine';\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.description)).toEqual(['not yet', 'skipped: nope', 'fine']);
  });

  test("the learner's own output is kept apart from the tests", () => {
    const r = report("say 'hello';\nis 1, 1, 'fine';\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });
});

// Runs the interpreter can't report on itself: stopped by the watchdog, or crashed.
describe('parseRun on aborted runs', () => {
  const aborted = (r: Partial<RunResult>) => parseRun({ rc: -1, lines: [], ...r }, 'is 1, 1;\n', PRELUDE_LINES);

  test('timeout', () => {
    expect(aborted({ aborted: 'timeout' })).toMatchObject({ status: 'error', message: expect.stringMatching(/infinite loop/) });
  });

  test('stack overflow', () => {
    const r = aborted({ aborted: 'crash', message: 'RangeError: Maximum call stack size exceeded' });
    expect(r).toMatchObject({ status: 'error', message: expect.stringMatching(/Recursion went too deep/) });
  });

  test('other crash', () => {
    expect(aborted({ aborted: 'crash', message: 'unreachable' })).toMatchObject({
      status: 'error',
      message: 'The interpreter crashed: unreachable',
    });
  });

  test('no tests and no error message', () => {
    expect(aborted({})).toMatchObject({ status: 'error', message: 'The koan did not finish cleanly.' });
  });
});
