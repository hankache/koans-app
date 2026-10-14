// What the TypeScript worker really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('typescript');

describe('parseRun on real TypeScript output', () => {
  test('passing koan, with type assertions', async () => {
    const r = await report("const age = 36;\nassert.type<36>(age, 'type');\nassert.typeEqual<string[], Array<string>>('same');\nassert.equal(age, 36, 'value');\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true, true]);
  });

  test('a blank fails on its own line, as a value or as a type', async () => {
    for (const line of ["assert.equal(1, ___, 'b');", "assert.type<___>(1, 'b');", "assert.typeEqual<string, ___>('b');"]) {
      const r = await report(`assert.ok(true, 'a');\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong type shows the answer against the type TypeScript found', async () => {
    const r = await report("let age = 36;\nassert.type<36>(age, 'widened');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2, blank: false, answer: '36', actual: 'number' });
  });

  test('type checks are reported in order with the other assertions', async () => {
    const r = await report("assert.equal(1, 2, 'first');\nassert.type<string>(1, 'second');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'first', line: 1 });
    expect(r.tests.map(t => t.ok)).toEqual([false, false]);
  });

  test('lines stay right after type-only lines are removed', async () => {
    const r = await report("interface Point {\n  x: number;\n  y: number;\n}\ntype Pair = [number, number];\nconst p: Point = { x: 1, y: 2 };\nassert.equal(p.x, 5, 'after');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'after', line: 7 });
  });

  test('another type error stops the koan before it runs, at its line', async () => {
    const r = await report("console.log('never printed');\nconst n: number = 'text';\n");
    expect(r).toMatchObject({ status: 'error', line: 2, output: [], message: "TS2322: Type 'string' is not assignable to type 'number'." });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('assert.ok(true);\nconst o: { x: number } | null = null as { x: number } | null;\no!.x;\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: expect.stringMatching(/^TypeError: /) });
  });

  test('await works at the top of a koan, and its types are checked', async () => {
    const r = await report("const v = await Promise.resolve('done');\nassert.type<string>(v, 'type');\nassert.equal(v, 'done', 'value');\n");
    expect(r.status).toBe('passed');
  });
});
