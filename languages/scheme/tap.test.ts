// What Stak really prints, through the worker, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('scheme');

describe('parseRun on real Scheme output', () => {
  test('passing koan', async () => {
    const r = await report('(test-equal "one" 2 (+ 1 1))\n(test-assert "two" #t)\n');
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the test', async () => {
    for (const line of ['(test-assert "b" ___)', '(test-equal "b" ___ 1)', '(test-equal "b" 3 (+ ___ 1))', '(test-error "b" #t ___)', '(test-eqv "b" ___ 1)']) {
      const r = await report(`(test-assert "a" #t)\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Scheme computed', async () => {
    const r = await report(`(test-equal "lists" '(1 "x" #\\a) (list 1 "y" #\\a))\n`);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '(1 "x" #\\a)', actual: '(1 "y" #\\a)' });
  });

  test('a failure inside a function reports the line it was tested on', async () => {
    const r = await report('(define (check)\n  (test-equal "inside" 2 1))\n(check)\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('test-group describes the tests inside it', async () => {
    const r = await report('(test-group "with +"\n  (test-equal "small numbers" 3 (+ 1 1)))\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'with + small numbers', line: 2 });
  });

  test('test-error checks that a form raises, and what', async () => {
    const r = await report('(test-error "a" #t (error "no"))\n(test-error "b" symbol? (raise \'oops))\n(test-error "c" #t (+ 1 1))\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, false]);
    expect(r.failure.diag.join(' ')).toMatch(/none was raised/);
  });

  test('a test that raises fails with the error, and the koan carries on', async () => {
    const r = await report('(test-equal "raises" 1 (error "out of range:" 5))\n(test-assert "after" #t)\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([false, true]);
    expect(r.failure.diag.join(' ')).toMatch(/it raised: out of range: 5/);
  });

  test('an uncaught error stops the koan, at its line', async () => {
    const r = await report('(test-assert "fine" #t)\n(error "Something bad:" 42)\n(test-assert "never" #t)\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Something bad: 42' });
  });

  test("an error in a define's value is reported at its line", async () => {
    const r = await report('(test-assert "fine" #t)\n(define x\n  (error "in define"))\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: 'in define' });
  });

  test('unbalanced parentheses point at their line', async () => {
    let r = await report('(test-assert "fine" #t)\n(define (f x)\n  (+ x 1)\n');
    expect(r).toMatchObject({ status: 'error', line: 2 });
    if (r.status === 'error') expect(r.message).toMatch(/missing \)/);
    r = await report('(test-assert "fine" #t))\n');
    expect(r).toMatchObject({ status: 'error', line: 1 });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report('(display "hello")\n(newline)\n(test-assert "fine" #t)\n');
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('every run is a fresh program: definitions do not leak from one run into the next', async () => {
    await report('(define leftover 1)\n(test-assert #t)\n');
    const r = await report('(test-error "fresh" #t (leftover))\n');
    expect(r.status).toBe('passed');
  });
});
