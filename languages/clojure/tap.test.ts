// What Scittle really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('clojure');

describe('parseRun on real Clojure output', () => {
  test('passing koan', async () => {
    const r = await report('(is (= 2 (+ 1 1)) "one")\n(is true "two")\n');
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever the assertion', async () => {
    for (const line of ['(is ___ "b")', '(is (= ___ 1) "b")', '(is (nil? ___) "b")', '(is (thrown? :default ___) "b")']) {
      const r = await report(`(is true "a")\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Clojure computed', async () => {
    const r = await report('(is (= {:a [1 "x"]} {:a [1 "y"]}) "maps")\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '{:a [1 "x"]}', actual: '{:a [1 "y"]}' });
  });

  test('a failure inside a function reports the line it was asserted on', async () => {
    const r = await report('(defn check []\n  (is (= 2 1) "inside"))\n(check)\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('testing and deftest describe the assertions inside them', async () => {
    const r = await report('(deftest adding\n  (testing "with +"\n    (is (= 3 (+ 1 1)) "small numbers")))\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'with + small numbers', line: 3 });
  });

  test('thrown? and thrown-with-msg? check what a form throws', async () => {
    const r = await report('(is (thrown? js/Error (throw (js/Error. "no"))) "a")\n(is (thrown-with-msg? :default #"bo+m" (throw (ex-info "boom" {}))) "b")\n(is (thrown? :default (+ 1 1)) "c")\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, false]);
    expect(r.failure.diag.join(' ')).toMatch(/none was thrown/);
  });

  test('an assertion that throws fails with the error, and the koan carries on', async () => {
    const r = await report('(is (= 1 (nth [] 5)) "out of range")\n(is true "after")\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([false, true]);
    expect(r.failure.diag.join(' ')).toMatch(/it threw: .*No item 5/);
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('(is true)\n(nope)\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Unable to resolve symbol: nope' });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('(is true)\n(let [x 1]\n');
    expect(r).toMatchObject({ status: 'error', line: 2 });
    if (r.status === 'error') expect(r.message).toMatch(/EOF while reading/);
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report('(println "hello" 1)\n(is true "fine")\n');
    expect(r).toMatchObject({ status: 'passed', output: ['hello 1'] });
  });

  test('every run gets a fresh Scittle: definitions do not leak from one run into the next', async () => {
    await report('(def leftover 1)\n(is true)\n');
    const r = await report('(is (thrown? :default (eval (quote leftover))) "fresh")\n');
    expect(r.status).toBe('passed');
  });
});
