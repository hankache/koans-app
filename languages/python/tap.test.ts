// What Pyodide really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('python');

describe('parseRun on real Python output', () => {
  test('passing koan', () => {
    const r = report("assert_equal(1 + 1, 2, 'one')\nassert_true([0], 'two')\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', () => {
    for (const line of ["assert_true(___, 'b')", "assert_false(___, 'b')", "assert_raises(___, lambda: 1, 'b')"]) {
      const r = report(`assert_equal(1, 1, 'a')\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Python computed', () => {
    const r = report("assert_equal(7 // 2, 4, 'floor')\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '4', actual: '3' });
  });

  test('strings show as Python writes them, newlines escaped', () => {
    const r = report("assert_equal('a\\nb', 'a\\nc', 'text')\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: "'a\\nc'", actual: "'a\\nb'" });
  });

  test('exceptions are named by their class', () => {
    const r = report("assert_raises(ValueError, lambda: 1 / 0, 'wrong one')\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'ValueError', actual: 'ZeroDivisionError' });
  });

  test('a failure inside a function reports the line it was asserted on', () => {
    const r = report("def check():\n    assert_equal(1, 2, 'inside')\n\ncheck()\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a syntax error points at its line, with the message from the end of the traceback', () => {
    const r = report("assert_equal(1, 1)\nx = = 2\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'SyntaxError: invalid syntax' });
  });

  test('an exception outside any test is an error at its line', () => {
    const r = report("assert_equal(1, 1)\nprint(nope)\n");
    expect(r).toMatchObject({ status: 'error', line: 2, message: expect.stringMatching(/^NameError: name 'nope' is not defined/) });
  });

  test("the learner's own output is kept apart from the tests", () => {
    const r = report("print('hello')\nassert_true(True, 'fine')\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('each run starts from fresh globals', () => {
    report("leftover = 1\nassert_true(True)\n");
    expect(report("assert_false('leftover' in globals(), 'fresh')\n").status).toBe('passed');
  });
});
