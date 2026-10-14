// What wasmoon really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('lua');

describe('parseRun on real Lua output', () => {
  test('passing koan', async () => {
    const r = await report("assert.are.equal(2, 1 + 1, 'one')\nassert(true, 'two')\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of ["assert(___, 'b')", "assert.are.equal(___, 1, 'b')", "assert.is_nil(___, 'b')", "assert.has_error(___, 'b')"]) {
      const r = await report(`assert(true, 'a')\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Lua computed', async () => {
    const r = await report("assert.are.same({1, 2, x = 'a'}, {1, 3, x = 'a'}, 'tables')\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '{1, 2, x = "a"}', actual: '{1, 3, x = "a"}' });
  });

  test('a failure inside a function reports the line it was asserted on', async () => {
    const r = await report("local function check()\n  assert.are.equal(2, 1, 'inside')\nend\ncheck()\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test("a call's extra results taken for the message are explained", async () => {
    const r = await report("assert.are.equal(7, ('hello world'):find('world'))\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure.diag.join(' ')).toMatch(/not a string: did a call return more than one value/);
  });

  test('a syntax error points at its line', async () => {
    const r = await report('assert(true)\nlocal x = = 1\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: "syntax error: unexpected symbol near '='" });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('assert(true)\nnope()\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: "attempt to call a nil value (global 'nope')" });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("print('hello', 1)\nassert(true, 'fine')\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello\t1'] });
  });

  test('every run gets a fresh Lua: globals do not leak from one run into the next', async () => {
    await report('leftover = 1\nassert(true)\n');
    expect((await report("assert.is_nil(leftover, 'fresh')\n")).status).toBe('passed');
  });
});
