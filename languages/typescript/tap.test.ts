// What the TypeScript worker really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('typescript');

describe('parseRun on real TypeScript output', () => {
  test('passing koan, with type checks', async () => {
    const r = await report(
      "const age = 36;\nexpectTypeOf(age).toEqualTypeOf<36>(); // type\nexpectTypeOf<string[]>().toEqualTypeOf<Array<string>>(); // same\nexpect(age, 'value').toBe(36);\n",
    );
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true, true]);
    expect(r.tests.map(t => t.description)).toEqual(['type', 'same', 'value']);
  });

  test('a blank fails on its own line, as a value or as a type', async () => {
    for (const line of [
      "expect(1, 'b').toBe(___);",
      'expectTypeOf(1).toEqualTypeOf<___>(); // b',
      'expectTypeOf<string>().toExtend<___>(); // b',
      'expectTypeOf((n: number) => String(n)).returns.toEqualTypeOf<___>(); // b',
    ]) {
      const r = await report(`expect(true, 'a').toBe(true);\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong type shows the answer against the type TypeScript found', async () => {
    const r = await report('let age = 36;\nexpectTypeOf(age).toEqualTypeOf<36>(); // widened\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2, blank: false, description: 'widened', answer: '36', actual: 'number' });
  });

  test('modifiers reach into functions, promises and arrays', async () => {
    const r = await report(
      [
        'const f = (a: string, b: number) => a.length > b;',
        'expectTypeOf(f).returns.toEqualTypeOf<boolean>(); // returns',
        'expectTypeOf(f).parameter(1).toEqualTypeOf<number>(); // parameter',
        'expectTypeOf(Promise.resolve(1)).resolves.toEqualTypeOf<number>(); // resolves',
        "expectTypeOf(['a']).items.toEqualTypeOf<string>(); // items",
        "expectTypeOf<'a'>().toExtend<string>(); // extends",
        'expectTypeOf<string>().not.toExtend<number>(); // not',
        '',
      ].join('\n'),
    );
    expect(r.status).toBe('passed');
    expect(r.tests).toHaveLength(6);
  });

  test('type checks are reported in order with the other tests', async () => {
    const r = await report("expect(1, 'first').toBe(2);\nexpectTypeOf(1).toEqualTypeOf<string>(); // second\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'first', line: 1 });
    expect(r.tests.map(t => t.ok)).toEqual([false, false]);
  });

  test('lines stay right after type-only lines are removed', async () => {
    const r = await report("interface Point {\n  x: number;\n  y: number;\n}\ntype Pair = [number, number];\nconst p: Point = { x: 1, y: 2 };\nexpect(p.x, 'after').toBe(5);\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'after', line: 7 });
  });

  test('another type error stops the koan before it runs, at its line', async () => {
    const r = await report("console.log('never printed');\nconst n: number = 'text';\n");
    expect(r).toMatchObject({ status: 'error', line: 2, output: [], message: "TS2322: Type 'string' is not assignable to type 'number'." });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('expect(true).toBe(true);\nconst o: { x: number } | null = null as { x: number } | null;\no!.x;\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: expect.stringMatching(/^TypeError: /) });
  });

  test('await works at the top of a koan, and its types are checked', async () => {
    const r = await report("const v = await Promise.resolve('done');\nexpectTypeOf(v).toEqualTypeOf<string>(); // type\nexpect(v, 'value').toBe('done');\n");
    expect(r.status).toBe('passed');
  });

  test('expect is typed, .resolves included', async () => {
    const r = await report("await expect(Promise.resolve(2), 'r').resolves.toBe(2);\nexpect([1], 'n').not.toContain(2);\n");
    expect(r.status).toBe('passed');
  });
});
