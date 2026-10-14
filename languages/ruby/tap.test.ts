// What ruby.wasm really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('ruby');

describe('parseRun on real Ruby output', () => {
  test('passing koan', async () => {
    const r = await report("assert_equal 2, 1 + 1, 'one'\nassert true, 'two'\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of ["assert ___, 'b'", "assert_equal ___, 1, 'b'", "assert_raises(___, 'b') { 1 / 0 }", "assert_nil ___, 'b'"]) {
      const r = await report(`assert true, 'a'\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Ruby computed', async () => {
    const r = await report("assert_equal({ a: 1 }, { a: 2 }, 'hash')\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '{a: 1}', actual: '{a: 2}' });
  });

  test('exceptions are named by their class', async () => {
    const r = await report("assert_raises(TypeError, 'wrong one') { 1 / 0 }\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'TypeError', actual: 'ZeroDivisionError' });
  });

  test('a failure inside a method reports the line it was asserted on', async () => {
    const r = await report("def check\n  assert_equal 2, 1, 'inside'\nend\ncheck\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a syntax error points at its line, with what Ruby expected', async () => {
    const r = await report('assert true\nx = = 1\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'SyntaxError: expected an expression after `=`' });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('assert true\nnope\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: "NameError: undefined local variable or method 'nope' for main" });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("puts 'hello'\np [1, :a]\nassert true, 'fine'\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello', '[1, :a]'] });
  });

  test('every run gets a fresh Ruby: classes do not leak from one run into the next', async () => {
    await report("class Dog\nend\nassert true\n");
    expect((await report("class Dog < Struct.new(:name)\nend\nassert_equal 'Rex', Dog.new('Rex').name, 'fresh'\n")).status).toBe('passed');
  });
});
