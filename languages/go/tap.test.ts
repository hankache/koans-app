// What Go's compiler and the koans' testing package really print, through the worker, read the way
// the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('go');

/** A koan file: its package, imports (testing and assert, plus any named) and body. */
const koan = (body: string, ...imports: string[]) =>
  `package koans\n\nimport (\n${[...imports, 'testing'].map(p => `\t"${p}"\n`).join('')}\n\t"github.com/stretchr/testify/assert"\n)\n\n${body}`;

/** The 1-based line of the first line of `code` containing `text`. */
const lineOf = (code: string, text: string) => code.split('\n').findIndex(l => l.includes(text)) + 1;

describe('parseRun on real Go output', () => {
  test('passing koan', async () => {
    const r = await report(koan('func TestIt(t *testing.T) {\n\tassert.Equal(t, 2, 1+1, "sum")\n\tassert.True(t, 1 < 2, "less")\n}\n'));
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => [t.ok, t.description])).toEqual([[true, 'sum'], [true, 'less']]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion, and the koan carries on', async () => {
    const checks = [
      'assert.Equal(t, ___, 1+1, "equal")',
      'assert.True(t, ___, "true")',
      'assert.Len(t, []int{1}, ___, "len")',
      'assert.Contains(t, "abc", ___, "contains")',
      'assert.ErrorIs(t, errors.New("x"), ___, "error is")',
      'assert.PanicsWithValue(t, ___, func() { panic(1) }, "panics")',
    ];
    const code = koan(`func TestIt(t *testing.T) {\n${checks.map(c => `\t${c}\n`).join('')}}\n`, 'errors');
    const r = await report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests).toHaveLength(checks.length);
    for (const [i, check] of checks.entries()) {
      expect(r.tests[i]).toMatchObject({ ok: false, line: lineOf(code, check), blank: true });
    }
  });

  test('a wrong answer shows the answer against what Go computed', async () => {
    const code = koan('func TestIt(t *testing.T) {\n\tassert.Equal(t, []int{1, 2}, []int{1, 3}, "slices")\n}\n');
    const r = await report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'slices', line: lineOf(code, 'slices'), blank: false, answer: '[]int{1, 2}', actual: '[]int{1, 3}' });
  });

  test('values of different types show their types', async () => {
    const r = await report(koan('func TestIt(t *testing.T) {\n\tassert.Equal(t, "3", 3)\n}\n'));
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: '"3" (string)', actual: '3 (int)' });
  });

  test("an untyped number compares as Go would compare the constant, and a struct shows without package main", async () => {
    const code = koan('type P struct{ X int }\n\nfunc TestIt(t *testing.T) {\n\tassert.Equal(t, 3, 3.0, "a")\n\tassert.Equal(t, \'e\', "e"[0], "b")\n\tassert.Equal(t, 3.5, 3, "c")\n\tassert.Equal(t, P{1}, P{2}, "d")\n}\n');
    const r = await report(code);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, false, false]);
    expect(r.tests[3].diag).toContain('expected: P{X:1}');
  });

  test('a failure inside a helper reports the line that called it, if it called t.Helper', async () => {
    const code = koan('func check(t *testing.T, n int) {\n\tt.Helper()\n\tassert.Equal(t, 0, n, "zero")\n}\n\nfunc TestIt(t *testing.T) {\n\tcheck(t, 1)\n}\n');
    const r = await report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure.line).toBe(lineOf(code, 'check(t, 1)'));
  });

  test("t.Errorf is a failing check at its line, with its message; a test that checks nothing reports itself", async () => {
    const code = koan('var _ = assert.True\n\nfunc TestQuiet(t *testing.T) {}\n\nfunc TestIt(t *testing.T) {\n\tt.Errorf("got %d", 4)\n}\n');
    const r = await report(code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => [t.ok, t.description])).toEqual([[true, 'TestQuiet'], [false, 'got 4']]);
    expect(r.failure.line).toBe(lineOf(code, 'Errorf'));
  });

  test('require ends the test at its failure; the next test still runs', async () => {
    const code = `package koans\n\nimport (\n\t"testing"\n\n\t"github.com/stretchr/testify/assert"\n\t"github.com/stretchr/testify/require"\n)\n\nfunc TestA(t *testing.T) {\n\trequire.Equal(t, 1, 2, "stops")\n\tassert.True(t, true, "never")\n}\n\nfunc TestB(t *testing.T) {\n\tassert.True(t, true, "runs")\n}\n`;
    const r = await report(code);
    expect(r.tests.map(t => t.description)).toEqual(['stops', 'runs']);
  });

  test('subtests are named after their parent', async () => {
    const r = await report(koan('func TestIt(t *testing.T) {\n\tt.Run("one case", func(t *testing.T) {\n\t\tassert.Equal(t, 1, 2)\n\t})\n}\n'));
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure.description).toBe('TestIt/one_case');
  });

  test('a compile error points at its line, with the compiler\'s message', async () => {
    const code = koan('func TestIt(t *testing.T) {\n\tassert.True(t, true)\n\tnope(1)\n}\n');
    const r = await report(code);
    expect(r).toMatchObject({ status: 'error', line: lineOf(code, 'nope'), message: 'undefined: nope' });
  });

  test('an unused import is an error, as in Go', async () => {
    const code = koan('func TestIt(t *testing.T) {\n\tassert.True(t, true)\n}\n', 'strings');
    const r = await report(code);
    expect(r).toMatchObject({ status: 'error', line: lineOf(code, '"strings"'), message: '"strings" imported and not used' });
  });

  test('a panic stops the koan, at its line, with Go\'s message', async () => {
    const code = koan('func TestIt(t *testing.T) {\n\tassert.True(t, true, "fine")\n\txs := []int{1}\n\ti := 5\n\t_ = xs[i]\n}\n');
    const r = await report(code);
    expect(r).toMatchObject({ status: 'error', line: lineOf(code, 'xs[i]'), message: 'panic: runtime error: index out of range [5] with length 1' });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report(koan('func TestIt(t *testing.T) {\n\tfmt.Println("hello")\n\tassert.True(t, true)\n}\n', 'fmt'));
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('every run is a fresh program: nothing leaks from one run into the next', async () => {
    await report(koan('var leftover = 1\n\nfunc TestIt(t *testing.T) {\n\tassert.True(t, true)\n}\n'));
    const r = await report(koan('func TestIt(t *testing.T) {\n\tassert.Equal(t, 1, leftover)\n}\n'));
    expect(r).toMatchObject({ status: 'error', message: 'undefined: leftover' });
  });
});
