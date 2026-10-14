// What the Python runner really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('python');

describe('parseRun on real Python output', () => {
  test('passing koan', async () => {
    const r = await report("assert 1 + 1 == 2, 'one'\nassert [0], 'two'\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('a blank fails on its own line, wherever it is in the assert', async () => {
    for (const line of ["assert ___, 'b'", "assert 1 == ___, 'b'", "assert -7 // ___ == -4, 'b'", 'with pytest.raises(___):  # b\n    1 / 0']) {
      const r = await report(`assert True, 'a'\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a failed comparison shows both sides, as pytest does', async () => {
    const r = await report("assert 7 // 2 == 4, 'floor'\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '4', actual: '3' });
  });

  test('other comparisons say what was false', async () => {
    const r = await report("assert 'z' in 'abc', 'in'\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure.diag).toContain("'z' in 'abc' is false");
  });

  test('pytest.raises names the exceptions, with the comment as its description', async () => {
    const r = await report('with pytest.raises(ValueError):  # wrong one\n    1 / 0\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'wrong one', answer: 'ValueError', actual: 'ZeroDivisionError' });
  });

  test('pytest.approx compares floats', async () => {
    expect((await report("assert 0.1 + 0.2 == pytest.approx(0.3), 'close'\n")).status).toBe('passed');
  });

  test('a failure inside a function reports the line of its assert', async () => {
    const r = await report("def check():\n    assert 1 == 2, 'inside'\n\ncheck()\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a syntax error points at its line, with the message from the end of the traceback', async () => {
    const r = await report('assert True\nx = = 2\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'SyntaxError: invalid syntax' });
  });

  test('an exception outside any assert is an error at its line', async () => {
    const r = await report('assert True\nprint(nope)\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: expect.stringMatching(/^NameError: name 'nope' is not defined/) });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("print('hello')\nassert True, 'fine'\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('each run starts from fresh globals', async () => {
    await report('leftover = 1\nassert True\n');
    expect((await report("assert 'leftover' not in globals(), 'fresh'\n")).status).toBe('passed');
  });
});
