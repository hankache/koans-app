// What php-wasm really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('php');

describe('parseRun on real PHP output', () => {
  test('passing koan', async () => {
    const r = await report("<?php\nassertSame(2, 1 + 1, 'one');\nassertContains(1, [1], 'two');\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of [
      "assertSame(___, 1, 'b');",
      "assertTrue(___, 'b');",
      "assertCount(___, [1], 'b');",
      "assertThrows(___, fn() => 1 % 0, 'b');",
      "assertEqualsWithDelta(0.3, 0.1 + 0.2, ___, 'b');",
    ]) {
      const r = await report(`<?php\nassertTrue(true, 'a');\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 3, blank: true });
    }
  });

  test('a wrong answer shows the answer against what PHP computed', async () => {
    const r = await report("<?php\nassertSame(['a' => 1], ['a' => '1'], 'array');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 2, blank: false, answer: "['a' => 1]", actual: "['a' => '1']" });
  });

  test('exceptions are named by their class', async () => {
    const r = await report("<?php\nassertThrows(TypeError::class, fn() => intdiv(1, 0), 'wrong one');\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'TypeError', actual: 'DivisionByZeroError' });
  });

  test('a failure inside a function reports the line it was asserted on', async () => {
    const r = await report("<?php\nfunction check() {\n  assertSame(2, 1, 'inside');\n}\ncheck();\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 3 });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('<?php\nassertTrue(true);\n$x = ;\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: 'ParseError: syntax error, unexpected token ";"' });
  });

  test('a warning stops the koan at its line', async () => {
    const r = await report('<?php\nassertTrue(true);\necho $nope;\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: 'Warning: Undefined variable $nope' });
  });

  test('a fatal error that is not an exception is reported too, with lines as the learner counts them', async () => {
    const r = await report('<?php\nfunction twice() {}\nfunction twice() {}\n');
    expect(r).toMatchObject({ status: 'error', line: 3, message: 'Fatal error: Cannot redeclare function twice() (previously declared on line 2)' });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("<?php\necho \"hello\\n\";\nprint_r([1, 2]);\nassertTrue(true, 'fine');\n");
    expect(r.status).toBe('passed');
    expect(r.output).toContain('hello');
  });

  test('every run gets a fresh PHP: declarations do not leak from one run into the next', async () => {
    await report('<?php\nclass Dog {}\nassertTrue(true);\n');
    expect((await report("<?php\nclass Dog {}\nassertTrue(class_exists('Dog'), 'fresh');\n")).status).toBe('passed');
  });
});
