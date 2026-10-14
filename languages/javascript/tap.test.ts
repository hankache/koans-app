// What the JavaScript worker really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('javascript');

describe('parseRun on real JavaScript output', () => {
  test('passing koan', async () => {
    const r = await report("expect(1 + 1, 'one').toBe(2);\nexpect([], 'two').toBeTruthy();\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of [
      "expect(___, 'b').toBeTruthy();",
      "expect([1], 'b').toEqual(___);",
      "expect(() => 1, 'b').toThrow(___);",
      "expect(2, 'b').not.toBe(___);",
      "await expect(Promise.reject(new Error('x')), 'b').rejects.toThrow(___);",
      "await expect(Promise.resolve(1), 'b').resolves.toBe(___);",
    ]) {
      const r = await report(`expect(true, 'a').toBe(true);\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what JavaScript computed', async () => {
    const r = await report("expect({ a: [1, 'x'] }, 'deep').toEqual({ a: [1, 'y'] });\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: "{ a: [1, 'y'] }", actual: "{ a: [1, 'x'] }" });
  });

  test('errors are named by their class', async () => {
    const r = await report("expect(() => null.x, 'wrong one').toThrow(RangeError);\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'RangeError', actual: 'TypeError' });
  });

  test('loose and strict equality are told apart', async () => {
    const r = await report("expect({ a: undefined }, 'loose').toEqual({});\nexpect({ a: undefined }, 'strict').toStrictEqual({});\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, false]);
  });

  test('a promise that resolves instead of rejecting says so', async () => {
    const r = await report("await expect(Promise.resolve(1), 'r').rejects.toThrow(Error);\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'a rejection', actual: 'it resolved to 1' });
  });

  test('a failure inside a function reports the line it was asserted on', async () => {
    const r = await report("function check() {\n  expect(1, 'inside').toBe(2);\n}\ncheck();\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a failure after await reports its line too', async () => {
    const r = await report("await null;\nexpect(await Promise.resolve(1), 'later').toBe(2);\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'later', line: 2 });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('expect(true).toBe(true);\nlet x = = 1;\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: expect.stringMatching(/^SyntaxError: /) });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('expect(true).toBe(true);\nnope();\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'ReferenceError: nope is not defined' });
  });

  test('koans are strict: assigning an undeclared name is an error', async () => {
    const r = await report('leaked = 1;\n');
    expect(r).toMatchObject({ status: 'error', line: 1, message: 'ReferenceError: leaked is not defined' });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("console.log('hello', [1, 2]);\nexpect(true, 'fine').toBe(true);\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello [1, 2]'] });
  });

  test('variables do not leak from one run into the next', async () => {
    await report('const leftover = 1;\nexpect(true).toBe(true);\n');
    expect((await report("expect(typeof leftover, 'fresh').toBe('undefined');\n")).status).toBe('passed');
  });
});
