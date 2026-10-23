// What the OCaml toplevel really prints, through the worker, read the way the result panel reads it.
import { describe, expect, test } from 'vitest';
import { runner } from '../../tests/run';

const { report } = await runner('ocaml');

describe('parseRun on real OCaml output', () => {
  test('passing koan', async () => {
    const r = await report('let () = check int "one" 2 (1 + 1)\nlet () = check bool "two" true (1 < 2)\n');
    expect(r.status).toBe('passed');
    expect(r.tests.map(t => t.ok)).toEqual([true, true]);
  });

  test('an unfilled blank fails on its own line, whatever its type', async () => {
    for (const line of ['let () = check int "b" ___ 1', 'let () = check (list string) "b" ___ ["a"]', 'let () = check (option int) "b" ___ None', 'let () = check_raises "b" ___ (fun () -> raise Exit)']) {
      const r = await report(`let () = check bool "a" true true\n${line}\n`);
      if (r.status !== 'failed') throw new Error(`${line}: expected a failure, got ${r.status}`);
      expect(r.failure).toMatchObject({ n: 2, description: 'b', line: 2, blank: true });
    }
  });

  test('a wrong answer shows the answer against what OCaml computed', async () => {
    const r = await report('let () = check (list (pair int string)) "pairs" [(1, "x")] [(1, "y")]\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ line: 1, blank: false, answer: '[(1, "x")]', actual: '[(1, "y")]' });
  });

  test('a failure inside a function reports the line it was checked on', async () => {
    const r = await report('let verify () =\n  check int "inside" 2 1\n\nlet () = verify ()\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.failure).toMatchObject({ description: 'inside', line: 2 });
  });

  test('check_raises checks the exception', async () => {
    const r = await report('let () = check_raises "a" Not_found (fun () -> raise Not_found)\nlet () = check_raises "b" (Failure "x") (fun () -> failwith "x")\nlet () = check_raises "c" Exit (fun () -> ())\n');
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}`);
    expect(r.tests.map(t => t.ok)).toEqual([true, true, false]);
    expect(r.failure.diag.join(' ')).toMatch(/no exception/);
  });

  test('an uncaught exception stops the koan, at its item', async () => {
    const r = await report('let () = check bool "fine" true true\nlet x = List.hd []\nlet () = check bool "never" true true\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Exception: Failure "hd"' });
  });

  test('a type error points at its line, inside an item', async () => {
    const r = await report('let () = check bool "fine" true true\nlet y : int =\n  "text"\n');
    expect(r).toMatchObject({ status: 'error', line: 3 });
    if (r.status === 'error') expect(r.message).toMatch(/has type string but an expression was expected of type int/);
  });

  test('an unbound name is an error at its line', async () => {
    const r = await report('let () = check bool "fine" true true\nlet () = nope 1\n');
    expect(r).toMatchObject({ status: 'error', line: 2, message: 'Unbound value nope' });
  });

  test('a syntax error points at its line', async () => {
    const r = await report('let () = check bool "fine" true true\nlet f x = (x + 1\n');
    expect(r).toMatchObject({ status: 'error', line: 2 });
    if (r.status === 'error') expect(r.message).toMatch(/Syntax error/);
  });

  test("the learner's own output is kept apart from the tests", async () => {
    const r = await report('let () = print_endline "hello"\nlet () = check bool "fine" true true\n');
    expect(r).toMatchObject({ status: 'passed', output: ['hello'] });
  });

  test('every run gets a fresh toplevel: definitions do not leak from one run into the next', async () => {
    await report('let leftover = 1\nlet () = check bool "a" true true\n');
    const r = await report('let leftover = leftover + 1\n');
    expect(r).toMatchObject({ status: 'error', message: 'Unbound value leftover' });
  });
});
