// What the JavaScript worker really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('javascript');

describe('parseRun on real JavaScript output', () => {
  test('passing koan', async () => {
    const r = await report("assert.equal(1 + 1, 2, 'one');\nassert.ok([], 'two');\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of [
      "assert.ok(___, 'b');",
      "assert.deepEqual([1], ___, 'b');",
      "assert.throws(() => 1, ___, 'b');",
      "await assert.rejects(Promise.reject(new Error('x')), ___, 'b');",
    ]) {
      const r = await report(`assert.ok(true, 'a');\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what JavaScript computed', async () => {
    const r = await report("assert.deepEqual({ a: [1, 'x'] }, { a: [1, 'y'] }, 'deep');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: "{ a: [1, 'y'] }", actual: "{ a: [1, 'x'] }" });
  });

  test('errors are named by their class', async () => {
    const r = await report("assert.throws(() => null.x, RangeError, 'wrong one');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'RangeError', actual: 'TypeError' });
  });

  test('a failure inside a function reports the line it was asserted on', async () => {
    const r = await report("function check() {\n  assert.equal(1, 2, 'inside');\n}\ncheck();\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a failure after await reports its line too', async () => {
    const r = await report("await null;\nassert.equal(await Promise.resolve(1), 2, 'later');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'later', line: 2 });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('assert.ok(true);\nlet x = = 1;\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: expect.stringMatching(/^SyntaxError: /) });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('assert.ok(true);\nnope();\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'ReferenceError: nope is not defined' });
  });

  test('koans are strict: assigning an undeclared name is an error', async () => {
    const r = await report('leaked = 1;\n');
    expect(r).toMatchObject({ status: 'error', line: 1, message: 'ReferenceError: leaked is not defined' });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("console.log('hello', [1, 2]);\nassert.ok(true, 'fine');\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello [1, 2]'] });
  });

  test('variables do not leak from one run into the next', async () => {
    await report('const leftover = 1;\nassert.ok(true);\n');
    expect((await report("assert.equal(typeof leftover, 'undefined', 'fresh');\n")).status).toBe('passed');
  });
});
