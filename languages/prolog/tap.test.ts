// What SWI-Prolog really prints, through the worker, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('prolog');

describe('parseRun on real Prolog output', () => {
  test('passing koan', async () => {
    const r = await report(":- begin_tests(basics).\ntest(one, X == 2) :- X is 1 + 1.\ntest(two) :- member(b, [a, b]).\n:- end_tests(basics).\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the option', async () => {
    for (const line of ['test(b, X == ___) :- X = 1.', 'test(b, ___) :- true.', 'test(b, error(___)) :- atom_length(_, _).', 'test(b, all(X == ___)) :- member(X, [1]).']) {
      const r = await report(`test(a) :- true.\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Prolog computed', async () => {
    const r = await report("test(pairs, L == [a-1, 'B'-x]) :- L = [a-1, 'B'-y].\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: "[a-1, 'B'-x]", actual: "[a-1, 'B'-y]" });
  });

  test('a test clause over several lines reports the line it starts on', async () => {
    const r = await report("test(multi, X == 2) :-\n    X is 1 + 2.\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'multi', line: 1 });
  });

  test('fail, error and all options', async () => {
    const r = await report("test(a, fail) :- member(z, [a]).\ntest(b, error(type_error(evaluable, _))) :- X is foo + 1, print(X).\ntest(c, all(X == [1, 2])) :- member(X, [1, 2]).\ntest(d, fail) :- true.\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, true, false]);
    expect(r.failure.diag.join(' ')).toMatch(/expected the goal to fail/);
  });

  test('a test that raises fails with the error, and the koan carries on', async () => {
    const r = await report("test(raises, X == 1) :- X is 1 / 0.\ntest(after) :- true.\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([false, true]);
    expect(r.failure.diag.join(' ')).toMatch(/it raised: .*zero_divisor/);
  });

  test('a syntax error points at its line', async () => {
    const r = await report("test(fine) :- true.\nfoo(1.\n");
    expect(r).toMatchObject({ status: 'error', line: 2 });
    if (r.status === 'error') expect(r.message).toMatch(/Syntax error/);
  });

  test('a directive that raises is an error at its line', async () => {
    const r = await report("test(fine) :- true.\n:- X is foo + 1, print(X).\n");
    expect(r).toMatchObject({ status: 'error', line: 2 });
    if (r.status === 'error') expect(r.message).toMatch(/not a function/);
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report(':- format("hello~n").\ntest(fine) :- true.\n');
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('every run gets a fresh SWI-Prolog: facts do not leak from one run into the next', async () => {
    await report(':- assertz(leftover(1)).\ntest(a) :- true.\n');
    const r = await report("test(fresh, error(existence_error(procedure, _))) :- leftover(_).\n");
    expect(r.status).toBe('passed');
  });
});
