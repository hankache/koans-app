// Runs JavaScript koans on the browser's own engine. In the browser this is a module worker,
// so a runaway koan can't freeze the page and can be killed; under Node, the build tools import
// run() from it (languages/javascript/node.mjs), so the checker and the tests use this same code.
//
// A koan runs through indirect eval as a strict script named koan.js (its //# sourceURL), so
// stack traces give its line numbers. Its first line is the prelude (languages/javascript/
// prelude.js), which takes ___ and assert from globalThis.__koan and opens an async function,
// so koans can use await; the epilogue closes the function, and the run waits for it.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

const FILE = 'koan.js';

/** ___: a unique value. Any assertion given it fails, whatever the assertion. */
const ___ = Object.freeze(Object.create(null, { [Symbol.toStringTag]: { value: '___' } }));

/** A value written the way Node's console writes it: 'text', [1, 2], { a: 1 }, Map(1) { 'k' => 1 }. */
export function show(value, seen = new Set()) {
  if (value === ___) return '___';
  switch (typeof value) {
    case 'string':
      return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
    case 'number':
      return Object.is(value, -0) ? '-0' : String(value);
    case 'bigint':
      return `${value}n`;
    case 'function':
      // Classes and functions by name: assert.throws shows which error it wanted (TypeError).
      return value.name || '(anonymous function)';
    case 'object':
      break;
    default:
      return String(value);
  }
  if (value === null) return 'null';
  if (seen.has(value)) return '[Circular]';
  seen.add(value);
  try {
    const items = (list, open, close) => (list.length ? `${open} ${list.join(', ')} ${close}` : `${open}${close}`);
    if (Array.isArray(value)) return `[${value.map(v => show(v, seen)).join(', ')}]`;
    if (value instanceof Map) return `Map(${value.size}) ` + items([...value].map(([k, v]) => `${show(k, seen)} => ${show(v, seen)}`), '{', '}');
    if (value instanceof Set) return `Set(${value.size}) ` + items([...value].map(v => show(v, seen)), '{', '}');
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? 'Invalid Date' : value.toISOString();
    if (value instanceof RegExp) return String(value);
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (value instanceof Promise) return 'Promise { … }';
    const name = Object.getPrototypeOf(value)?.constructor?.name;
    const keys = Object.keys(value).map(k => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : show(k)}: ${show(value[k], seen)}`);
    return (name && name !== 'Object' ? `${name} ` : '') + items(keys, '{', '}');
  } finally {
    seen.delete(value);
  }
}

/** Node's deepStrictEqual: same structure, same prototypes, primitives compared with Object.is. */
export function deepEqual(a, b, seen = new Map()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date) return Object.is(a.getTime(), b.getTime());
  if (a instanceof RegExp) return String(a) === String(b);
  if (a instanceof Map) {
    return a.size === b.size && [...a].every(([k, v]) => b.has(k) && deepEqual(v, b.get(k), seen));
  }
  if (a instanceof Set) {
    return a.size === b.size && [...a].every(v => b.has(v) || [...b].some(w => deepEqual(v, w, seen)));
  }
  if (Array.isArray(a) && a.length !== b.length) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(k => Object.hasOwn(b, k) && deepEqual(a[k], b[k], seen));
}

/** The koan's line that made this call: the first stack frame in koan.js below the prelude (line 1). */
function learnerLine(stack = new Error().stack ?? '') {
  for (const m of stack.matchAll(/koan\.js:(\d+):\d+/g)) if (Number(m[1]) > 1) return Number(m[1]);
  return 0;
}

/** Node's assert (the strict flavour), printing TAP: a failure reports itself and the koan carries on. */
function makeAssert(out, err) {
  let tests = 0;
  const report = (ok, msg, line, diag = []) => {
    tests++;
    out(`${ok ? 'ok' : 'not ok'} ${tests}${msg ? ` - ${msg}` : ''}`);
    if (!ok) {
      for (const d of diag) err(`# ${d}`);
      err(`# at web line ${line}`);
    }
    return ok;
  };
  const compare = (ok, expected, actual, msg, line) =>
    report(ok, msg, line, [`expected: ${show(expected)}`, `     got: ${show(actual)}`]);
  // Every assertion fails when given ___, whatever it would otherwise check.
  const check = (args, msg, test) => {
    const line = learnerLine();
    return args.some(a => a === ___) ? report(false, msg, line) : test(line);
  };
  // assert.throws(fn, 'message') takes the string as the message, as Node does.
  const wanted = (expected, msg) => (typeof expected === 'string' ? [undefined, expected] : [expected, msg]);
  const matches = (error, expected) =>
    expected === undefined ||
    (expected instanceof RegExp ? expected.test(String(error?.message ?? error)) : error instanceof expected);

  const assert = (value, msg) => assert.ok(value, msg);
  Object.assign(assert, {
    ok: (value, msg) => check([value], msg, line => report(Boolean(value), msg, line)),
    equal: (actual, expected, msg) =>
      check([actual, expected], msg, line => compare(Object.is(actual, expected), expected, actual, msg, line)),
    notEqual: (actual, unexpected, msg) =>
      check([actual, unexpected], msg, line => report(!Object.is(actual, unexpected), msg, line, [`didn't want: ${show(unexpected)}`])),
    deepEqual: (actual, expected, msg) =>
      check([actual, expected], msg, line => compare(deepEqual(actual, expected), expected, actual, msg, line)),
    notDeepEqual: (actual, unexpected, msg) =>
      check([actual, unexpected], msg, line => report(!deepEqual(actual, unexpected), msg, line, [`didn't want: ${show(unexpected)}`])),
    match: (string, regexp, msg) =>
      check([string, regexp], msg, line => compare(regexp instanceof RegExp && regexp.test(string), regexp, string, msg, line)),
    throws: (fn, expected, msg) => {
      [expected, msg] = wanted(expected, msg);
      return check([fn, expected], msg, line => {
        try {
          fn();
        } catch (error) {
          return matches(error, expected) ? report(true, msg, line) : compare(false, expected, error?.constructor ?? error, msg, line);
        }
        return report(false, msg, line, [`expected: ${expected === undefined ? 'an exception' : show(expected)}`, '     got: no exception']);
      });
    },
    rejects: async (promiseOrFn, expected, msg) => {
      [expected, msg] = wanted(expected, msg);
      const line = learnerLine();
      if ([promiseOrFn, expected].some(a => a === ___)) {
        // Still settle the promise, so its rejection doesn't go unhandled.
        if (typeof promiseOrFn?.then === 'function') promiseOrFn.then(undefined, () => {});
        return report(false, msg, line);
      }
      try {
        await (typeof promiseOrFn === 'function' ? promiseOrFn() : promiseOrFn);
      } catch (error) {
        return matches(error, expected) ? report(true, msg, line) : compare(false, expected, error?.constructor ?? error, msg, line);
      }
      return report(false, msg, line, [`expected: ${expected === undefined ? 'a rejection' : show(expected)}`, '     got: it resolved']);
    },
  });
  return assert;
}

/** An error the koan didn't catch, as stderr lines: its message, then the koan's line. */
async function describe(error, src) {
  if (error instanceof SyntaxError && !/koan\.js:\d+/.test(error.stack ?? '')) {
    // Browsers don't say where a syntax error is in eval'd code; a parser does.
    const { parse } = await import('./acorn.mjs');
    try {
      parse(src, { ecmaVersion: 'latest', sourceType: 'script' });
    } catch (found) {
      if (found.loc) return [`SyntaxError: ${found.message.replace(/ \(\d+:\d+\)$/, '')}`, `    at ${FILE}:${found.loc.line}`];
    }
  }
  const head = error instanceof Error ? `${error.name}: ${error.message}` : `Uncaught ${show(error)}`;
  const line = error instanceof Error ? learnerLine(error.stack ?? '') : 0;
  return line ? [head, `    at ${FILE}:${line}`] : [head];
}

/** Runs a whole koan (prelude + code + epilogue); returns its exit code and output lines. */
export async function run(src) {
  const lines = [];
  const push = stream => text => {
    for (const t of String(text).split('\n')) lines.push({ stream, text: t });
  };
  const out = push('out');
  const err = push('err');
  const format = args => args.map(a => (typeof a === 'string' ? a : show(a))).join(' ');
  const console = globalThis.console;
  globalThis.console = { ...console, log: (...a) => out(format(a)), info: (...a) => out(format(a)), warn: (...a) => err(format(a)), error: (...a) => err(format(a)) };
  globalThis.__koan = { ___, assert: makeAssert(out, err) };
  try {
    await (0, eval)(`${src}\n//# sourceURL=${FILE}`);
    return { rc: 0, lines };
  } catch (error) {
    for (const line of await describe(error, src)) err(line);
    return { rc: 1, lines };
  } finally {
    globalThis.console = console;
    delete globalThis.__koan;
  }
}

// In a browser worker: answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  Error.stackTraceLimit = 50;
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    self.postMessage({ type: 'done', id: data.id, ...(await run(data.src)) });
  };
  self.postMessage({ type: 'ready', version: navigator.userAgent });
}
