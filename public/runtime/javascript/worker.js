// Runs JavaScript koans on the browser's own engine. In the browser this is a module worker,
// so a runaway koan can't freeze the page and can be killed; under Node, the build tools import
// run() from it (languages/javascript/node.mjs), so the checker and the tests use this same code.
// TypeScript's worker runs its compiled koans through it too.
//
// The koans are tested the way most JavaScript developers test: with Vitest's `expect`
// (`expect(value, 'message').toBe(___)`, the same matchers as Jest's). Each matcher prints TAP: a
// failure reports itself and the koan carries on, so every blank is checked.
//
// A koan runs through indirect eval as a strict script named koan.js (its //# sourceURL), so
// stack traces give its line numbers. Its first line is the prelude (languages/javascript/
// prelude.js), which takes ___ and expect from globalThis.__koan and opens an async function, so
// koans can use await; the epilogue closes the function, and the run waits for it.
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
      // Classes and functions by name: toThrow shows which error it wanted (TypeError).
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

/**
 * Vitest's equality. Loose (toEqual): recursively equal, properties that are undefined count as
 * missing, and prototypes don't matter. Strict (toStrictEqual): prototypes and undefined
 * properties count too.
 */
export function equals(a, b, strict = false, seen = new Map()) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (seen.get(a) === b) return true;
  seen.set(a, b);
  if (a instanceof Date || b instanceof Date) return a instanceof Date && b instanceof Date && Object.is(a.getTime(), b.getTime());
  if (a instanceof RegExp || b instanceof RegExp) return String(a) === String(b);
  if (a instanceof Map || b instanceof Map) {
    return a instanceof Map && b instanceof Map && a.size === b.size &&
      [...a].every(([k, v]) => b.has(k) && equals(v, b.get(k), strict, seen));
  }
  if (a instanceof Set || b instanceof Set) {
    return a instanceof Set && b instanceof Set && a.size === b.size &&
      [...a].every(v => b.has(v) || [...b].some(w => equals(v, w, strict, seen)));
  }
  if (Array.isArray(a) && a.length !== b.length) return false;
  const keys = o => Object.keys(o).filter(k => strict || o[k] !== undefined);
  const ka = keys(a);
  return ka.length === keys(b).length && ka.every(k => Object.hasOwn(b, k) && equals(a[k], b[k], strict, seen));
}

/** Whether `actual` has every property of `expected`, deeply: toMatchObject. */
function matchesObject(actual, expected) {
  if (typeof expected !== 'object' || expected === null || typeof actual !== 'object' || actual === null) return equals(actual, expected);
  if (Array.isArray(expected)) return Array.isArray(actual) && actual.length === expected.length && expected.every((v, i) => matchesObject(actual[i], v));
  return Object.keys(expected).every(k => k in actual && matchesObject(actual[k], expected[k]));
}

/**
 * The koan's line in a stack trace: the first frame in koan.js below the prelude (line 1).
 * `mapLine` turns a line of the code that ran into a line of the koan, for code that was compiled
 * first (TypeScript's types are removed before it runs).
 */
function learnerLine(stack, mapLine = n => n) {
  for (const m of stack.matchAll(/koan\.js:(\d+):\d+/g)) {
    const line = mapLine(Number(m[1]));
    if (line > 1) return line;
  }
  return 0;
}

/**
 * Vitest's expect, printing TAP. With `typeChecks` (a Map from koan line to a check the TypeScript
 * worker made before the run), there's also expectTypeOf, which reports those checks in turn.
 */
function makeExpect(out, err, { mapLine, typeChecks } = {}) {
  const here = () => learnerLine(new Error().stack ?? '', mapLine);
  let tests = 0;
  const report = (ok, msg, line, diag = []) => {
    tests++;
    out(`${ok ? 'ok' : 'not ok'} ${tests}${msg ? ` - ${msg}` : ''}`);
    if (!ok) {
      for (const d of diag) err(`# ${d}`);
      err(`# at web line ${line}`);
    }
  };
  const errorText = error => String(error?.message ?? error);

  // Each matcher: (actual, ...args) → [pass, what it expected, what it got], the last two for a failure.
  const matchers = {
    toBe: (a, e) => [Object.is(a, e), show(e), show(a)],
    toEqual: (a, e) => [equals(a, e), show(e), show(a)],
    toStrictEqual: (a, e) => [equals(a, e, true), show(e), show(a)],
    toBeTruthy: a => [Boolean(a), 'a truthy value', show(a)],
    toBeFalsy: a => [!a, 'a falsy value', show(a)],
    toBeNull: a => [a === null, 'null', show(a)],
    toBeUndefined: a => [a === undefined, 'undefined', show(a)],
    toBeDefined: a => [a !== undefined, 'a defined value', show(a)],
    toBeNaN: a => [Number.isNaN(a), 'NaN', show(a)],
    toBeGreaterThan: (a, n) => [a > n, `> ${show(n)}`, show(a)],
    toBeGreaterThanOrEqual: (a, n) => [a >= n, `>= ${show(n)}`, show(a)],
    toBeLessThan: (a, n) => [a < n, `< ${show(n)}`, show(a)],
    toBeLessThanOrEqual: (a, n) => [a <= n, `<= ${show(n)}`, show(a)],
    toBeCloseTo: (a, n, digits = 2) => [Math.abs(a - n) < 10 ** -digits / 2, `${show(n)} (to ${digits} places)`, show(a)],
    toContain: (a, item) => [typeof a === 'string' ? a.includes(item) : [...a].some(x => x === item), `something containing ${show(item)}`, show(a)],
    toContainEqual: (a, item) => [[...a].some(x => equals(x, item)), `something containing ${show(item)}`, show(a)],
    toHaveLength: (a, n) => [a?.length === n, `length ${show(n)}`, `length ${show(a?.length)}`],
    toHaveProperty: (a, path, ...value) => {
      const keys = Array.isArray(path) ? path : String(path).split('.');
      let target = a;
      for (const k of keys) {
        if (target === null || target === undefined || !(k in Object(target))) return [false, `a property ${show(path)}`, show(a)];
        target = target[k];
      }
      return value.length ? [equals(target, value[0]), `${show(path)} to be ${show(value[0])}`, show(target)] : [true, '', ''];
    },
    toMatch: (a, p) => [p instanceof RegExp ? p.test(a) : String(a).includes(p), show(p), show(a)],
    toMatchObject: (a, o) => [matchesObject(a, o), show(o), show(a)],
    toBeInstanceOf: (a, cls) => [a instanceof cls, `an instance of ${show(cls)}`, a?.constructor ? show(a.constructor) : show(a)],
    // toThrow gets the error the function threw (or, for .rejects, the rejection), else no error.
    toThrow: (thrown, expected) => {
      if (!thrown.threw) return [false, expected === undefined ? 'an error' : show(expected), 'no error'];
      const e = thrown.error;
      const ok =
        expected === undefined ? true
        : expected instanceof RegExp ? expected.test(errorText(e))
        : typeof expected === 'string' ? errorText(e).includes(expected)
        : typeof expected === 'function' ? e instanceof expected
        : errorText(e) === errorText(expected);
      return [ok, show(expected), typeof expected === 'function' ? show(e?.constructor ?? e) : show(errorText(e))];
    },
  };

  const settle = promise => {
    // A blank shouldn't leave a rejection unhandled.
    if (typeof promise?.then === 'function') promise.then(undefined, () => {});
  };

  function build(actual, msg, { negate = false, mode = null } = {}) {
    const chain = {};
    for (const [name, matcher] of Object.entries(matchers)) {
      chain[name] = (...args) => {
        const line = here();
        if (actual === ___ || args.some(a => a === ___)) {
          if (mode) settle(actual);
          report(false, msg, line);
          return mode ? Promise.resolve() : undefined;
        }
        const judge = value => {
          const [pass, expected, got] = matcher(value, ...args);
          const ok = negate ? !pass : pass;
          report(ok, msg, line, ok ? [] : negate ? [`expected not: ${expected}`, `     got: ${got}`] : [`expected: ${expected}`, `     got: ${got}`]);
        };
        if (mode) {
          return Promise.resolve(actual).then(
            value => {
              if (mode === 'rejects') report(false, msg, line, ['expected: a rejection', `     got: it resolved to ${show(value)}`]);
              else judge(name === 'toThrow' ? { threw: false } : value);
            },
            error => {
              if (mode === 'resolves') report(false, msg, line, ['expected: it to resolve', `     got: a rejection: ${errorText(error)}`]);
              else judge(name === 'toThrow' ? { threw: true, error } : error);
            },
          );
        }
        if (name === 'toThrow') {
          let thrown = { threw: false };
          try {
            actual();
          } catch (error) {
            thrown = { threw: true, error };
          }
          judge(thrown);
        } else {
          judge(actual);
        }
      };
    }
    if (!negate) Object.defineProperty(chain, 'not', { get: () => build(actual, msg, { negate: true, mode }) });
    if (!mode) {
      Object.defineProperty(chain, 'resolves', { get: () => build(actual, msg, { negate, mode: 'resolves' }) });
      Object.defineProperty(chain, 'rejects', { get: () => build(actual, msg, { negate, mode: 'rejects' }) });
    }
    return chain;
  }

  const expect = (actual, msg) => build(actual, msg);

  // expectTypeOf(value).toEqualTypeOf<T>(), and its modifiers: the TypeScript worker decided these
  // before the run, so at run time the chain only reports them, in turn with the other tests.
  const typeCheck = () => {
    const line = here();
    const found = typeChecks?.get(line);
    if (!found) return report(false, undefined, line, ['no type check was made for this line']);
    if (found.blank) return report(false, found.desc, line);
    report(found.ok, found.desc, line, found.diag ?? [`expected: ${found.expected}`, `     got: ${found.actual}`]);
  };
  const typeChain = { toEqualTypeOf: typeCheck, toExtend: typeCheck, parameter: () => typeChain };
  for (const name of ['not', 'returns', 'resolves', 'items']) Object.defineProperty(typeChain, name, { get: () => typeChain });
  const expectTypeOf = () => typeChain;

  return { expect, expectTypeOf };
}

/** An error the koan didn't catch, as stderr lines: its message, then the koan's line. */
async function describe(error, src, mapLine) {
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
  const line = error instanceof Error ? learnerLine(error.stack ?? '', mapLine) : 0;
  return line ? [head, `    at ${FILE}:${line}`] : [head];
}

/**
 * Runs a whole koan (prelude + code + epilogue); returns its exit code and output lines.
 * `options` (mapLine, typeChecks) are for code compiled from TypeScript: see makeExpect.
 */
export async function run(src, options = {}) {
  const lines = [];
  const push = stream => text => {
    for (const t of String(text).split('\n')) lines.push({ stream, text: t });
  };
  const out = push('out');
  const err = push('err');
  const format = args => args.map(a => (typeof a === 'string' ? a : show(a))).join(' ');
  const console = globalThis.console;
  globalThis.console = { ...console, log: (...a) => out(format(a)), info: (...a) => out(format(a)), warn: (...a) => err(format(a)), error: (...a) => err(format(a)) };
  globalThis.__koan = { ___, ...makeExpect(out, err, options) };
  try {
    await (0, eval)(`${src}\n//# sourceURL=${FILE}`);
    return { rc: 0, lines };
  } catch (error) {
    for (const line of await describe(error, src, options.mapLine)) err(line);
    return { rc: 1, lines };
  } finally {
    globalThis.console = console;
    delete globalThis.__koan;
  }
}

/**
 * Takes from this worker what koan code must never reach: the site's saved files (caches), the
 * learner's saved progress (indexedDB), and the channel open tabs sync it over (BroadcastChannel),
 * all shared with the page. Koans don't need them, and code from a shared link could otherwise
 * rewrite the site's offline copy or the learner's progress. Run once the interpreter has loaded,
 * before any koan. Removed from the global object and every prototype above it, so they can't be
 * found again; if one can't be removed, this throws rather than run koans with it.
 */
export function lockDown(scope = globalThis) {
  for (const name of ['caches', 'indexedDB', 'BroadcastChannel']) {
    for (let o = scope; o; o = Object.getPrototypeOf(o)) Reflect.deleteProperty(o, name);
    if (name in scope) throw new Error(`could not remove ${name} from the worker`);
  }
}

// In a browser worker, when this is the worker's own script (not imported by another worker's,
// as TypeScript's imports it): answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  Error.stackTraceLimit = 50;
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    self.postMessage({ type: 'done', id: data.id, ...(await run(data.src)) });
  };
  lockDown();
  self.postMessage({ type: 'ready', version: navigator.userAgent });
}
