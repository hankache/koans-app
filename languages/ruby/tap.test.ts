// What ruby.wasm really prints, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('ruby');

describe('parseRun on real Ruby output', () => {
  test('passing koan', async () => {
    const r = await report("expect(1 + 1).to eq(2), 'one'\nexpect([1]).to include(1), 'two'\n");
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
    expect(r.tests.map(t => t.description)).toEqual(['one', 'two']);
  });

  test('an unfilled blank fails on its own line, whatever the matcher', async () => {
    for (const line of [
      "expect(___).to be_truthy, 'b'",
      "expect(1).to eq(___), 'b'",
      "expect { 1 / 0 }.to raise_error(___), 'b'",
      "expect(0.3).to be_within(0.01).of(___), 'b'",
      "expect([1]).to all(___), 'b'",
      "expect(2).not_to eq(___), 'b'",
    ]) {
      const r = await report(`expect(true).to be(true), 'a'\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what Ruby computed', async () => {
    const r = await report("expect({ a: 2 }).to eq({ a: 1 }), 'hash'\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '{a: 1}', actual: '{a: 2}' });
  });

  test('errors are named by their class', async () => {
    const r = await report("expect { 1 / 0 }.to raise_error(TypeError), 'wrong one'\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ answer: 'TypeError', actual: 'ZeroDivisionError' });
  });

  test('block matchers: change, output, and a block that raises nothing', async () => {
    const r = await report(
      [
        'a = []',
        "expect { a << 1 }.to change { a.size }.by(1), 'change'",
        "expect { puts 'hi' }.to output(\"hi\\n\").to_stdout, 'output'",
        "expect { 1 }.to raise_error(ArgumentError), 'nothing'",
        '',
      ].join('\n'),
    );
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, false]);
    expect(r.failure).toMatchObject({ line: 4, answer: 'ArgumentError', actual: 'no error' });
  });

  test('predicate matchers, and include still includes modules at the top level', async () => {
    const r = await report("expect([]).to be_empty, 'p'\nexpect({ k: 1 }).to have_key(:k), 'h'\nmodule M\n  def hi = 1\nend\ninclude M\nexpect(hi).to eq(1), 'm'\n");
    expect(r.status).toBe('passed');
  });

  test('a failure inside a method reports the line it was expected on', async () => {
    const r = await report("def check\n  expect(1).to eq(2), 'inside'\nend\ncheck\n");
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('a syntax error points at its line, with what Ruby expected', async () => {
    const r = await report('expect(true).to be(true)\nx = = 1\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'SyntaxError: expected an expression after `=`' });
  });

  test('an uncaught error is an error at its line', async () => {
    const r = await report('expect(true).to be(true)\nnope\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: "NameError: undefined local variable or method 'nope' for main" });
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report("puts 'hello'\np [1, :a]\nexpect(true).to be(true), 'fine'\n");
    expect(r).toMatchObject({ status: 'passed', output: ['hello', '[1, :a]'] });
  });

  test('every run gets a fresh Ruby: classes do not leak from one run into the next', async () => {
    await report('class Dog\nend\nexpect(true).to be(true)\n');
    expect((await report("class Dog < Struct.new(:name)\nend\nexpect(Dog.new('Rex').name).to eq('Rex'), 'fresh'\n")).status).toBe('passed');
  });
});
