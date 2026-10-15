// What webR really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('r');

describe('parseRun on real R output', () => {
  test('passing koan', async () => {
    const r = await report('test_that("one", expect_equal(1 + 1, 2))\ntest_that("two", {\n  expect_true(TRUE)\n  expect_length(1:3, 3)\n})\n');
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true, true]);
    expect(r.tests.map(t => t.description)).toEqual(['one', 'two', 'two']);
  });

  test('an unfilled blank fails on its own line, whatever the expectation', async () => {
    for (const line of [
      'test_that("b", expect_equal(1, ___))',
      'test_that("b", expect_true(___))',
      'test_that("b", expect_error(stop("x"), ___))',
      'test_that("b", expect_type(1, ___))',
      'test_that("b", expect_warning(as.integer("x"), ___))',
    ]) {
      const r = await report(`test_that("a", expect_true(TRUE))\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a blank inside braces fails on its own line', async () => {
    const r = await report('test_that("block", {\n  x <- 2\n  expect_equal(x * 2, ___)\n})\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'block', line: 3, blank: true });
  });

  test('a wrong answer shows the answer against what R computed', async () => {
    const r = await report('test_that("vec", expect_equal(c(1, 2), c(1, 3)))\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: 'c(1, 3)', actual: 'c(1, 2)' });
  });

  test('an expectation outside test_that is described by its call', async () => {
    const r = await report('expect_identical(1L, 1)\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'expect_identical(1L, 1)', answer: '1', actual: '1L' });
  });

  test('a failure inside a function reports the line it was expected on', async () => {
    const r = await report('check <- function() {\n  expect_equal(1, 2)\n}\ncheck()\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2 });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('x <- 1\ny = = 2\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: "Error: unexpected '='" });
  });

  test('an uncaught error is an error at its line, inside a function too', async () => {
    const r = await report('f <- function(x) {\n  sqrt(x)\n}\nf("a")\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Error in sqrt(x): non-numeric argument to mathematical function' });
  });

  test("the learner's own output is kept apart from the tests, and visible values print", async () => {
    const r = await report('cat("hello\\n")\n1:3\ntest_that("fine", expect_true(TRUE))\n');
    expect(r).toMatchObject({ status: 'passed', output: ['hello', '[1] 1 2 3'] });
  });

  test('every run starts with an empty global environment', async () => {
    await report('leftover <- 1\nexpect_true(TRUE)\n');
    expect((await report('test_that("fresh", expect_false(exists("leftover")))\n')).status).toBe('passed');
  });
});
