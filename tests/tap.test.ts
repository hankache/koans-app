import { describe, expect, test } from 'vitest';
import { parseRun } from '../src/lib/tap';
import type { RunResult } from '../src/lib/runtime/wasm-runtime';

// Each language's real output is tested in languages/<id>/tap.test.ts.

// Runs the interpreter can't report on itself: stopped by the watchdog, or crashed.
describe('parseRun on aborted runs', () => {
  const aborted = (r: Partial<RunResult>) => parseRun({ rc: -1, lines: [], ...r }, 'is 1, 1;\n', 1);

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
