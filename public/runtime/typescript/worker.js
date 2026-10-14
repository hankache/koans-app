// Runs TypeScript koans: type-checks each one with the TypeScript compiler, then compiles it to
// JavaScript and runs it on the JavaScript worker's code (../javascript/worker.js). In the browser
// this is a module worker; under Node, the build tools import makeRunner() from it
// (languages/typescript/node.mjs), so the checker and the tests use this same code.
//
// Type checks become test results. assert.type<T>(value) passes when the value's type is exactly
// T, and assert.typeEqual<A, B>() when A and B are the same type; the worker decides that before
// the run, and the assertion reports it when the koan reaches it, in order with the others. Any
// other type error stops the koan before it runs, with its line, like a compile error.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
import { run as runJavaScript } from '../javascript/worker.js';

const KOAN = '/koan.ts';
const TYPES = '/koans.d.ts';

/** What every koan can use: the prelude's ___ and assert, and the few globals of a worker it needs. */
const KOAN_TYPES = `
declare const __blank: unique symbol;
/** ___: a blank to fill in, as a value or as a type. */
type ___ = { readonly [__blank]: true };
interface KoanAssert {
  (value: unknown, message?: string): void;
  ok(value: unknown, message?: string): void;
  equal(actual: unknown, expected: unknown, message?: string): void;
  notEqual(actual: unknown, unexpected: unknown, message?: string): void;
  deepEqual(actual: unknown, expected: unknown, message?: string): void;
  notDeepEqual(actual: unknown, unexpected: unknown, message?: string): void;
  match(string: unknown, regexp: unknown, message?: string): void;
  throws(fn: () => unknown, expected?: unknown, message?: string): void;
  rejects(promise: unknown, expected?: unknown, message?: string): Promise<void>;
  /** Passes when the value's type is exactly T. */
  type<T>(value: unknown, message?: string): void;
  /** Passes when A and B are the same type. */
  typeEqual<A, B>(message?: string): void;
}
declare var __koan: { ___: ___; assert: KoanAssert };
declare var console: { log(...data: unknown[]): void; info(...data: unknown[]): void; warn(...data: unknown[]): void; error(...data: unknown[]): void };
declare function setTimeout(handler: () => void, timeout?: number): number;
declare function clearTimeout(id?: number): void;
declare function structuredClone<T>(value: T): T;
`;

/** Decodes a source map's mappings into a function from generated line to source line (1-based). */
function lineMapper(mappings) {
  const digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const decode = segment => {
    const values = [];
    let value = 0;
    let shift = 0;
    for (const char of segment) {
      const digit = digits.indexOf(char);
      value += (digit & 31) << shift;
      if (digit & 32) {
        shift += 5;
      } else {
        values.push(value & 1 ? -(value >>> 1) : value >>> 1);
        value = 0;
        shift = 0;
      }
    }
    return values;
  };
  const lines = [];
  let sourceLine = 0;
  mappings.split(';').forEach((group, generated) => {
    for (const segment of group.split(',')) {
      if (!segment) continue;
      const fields = decode(segment);
      if (fields.length < 4) continue;
      sourceLine += fields[2];
      lines[generated] ??= sourceLine;
    }
  });
  return line => (lines[line - 1] ?? line - 1) + 1;
}

/**
 * A runner on this TypeScript (the compiler's `ts` object) and its library files (name → text,
 * lib.es2023.d.ts and everything it refers to).
 */
export function makeRunner(ts, libs) {
  const options = {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    lib: ['lib.es2023.d.ts'],
    types: [],
    noEmit: true,
    skipLibCheck: true,
  };
  // Library files are parsed once and reused by every run.
  const parsed = new Map();
  let typesFile;
  const base = name => name.replace(/^.*\//, '');

  function typeCheck(src) {
    const host = {
      getSourceFile(fileName, languageVersion) {
        if (fileName === KOAN) return ts.createSourceFile(KOAN, src, languageVersion, true);
        if (fileName === TYPES) return (typesFile ??= ts.createSourceFile(TYPES, KOAN_TYPES, languageVersion, true));
        const name = base(fileName);
        if (!parsed.has(name) && libs.has(name)) parsed.set(name, ts.createSourceFile(fileName, libs.get(name), languageVersion, true));
        return parsed.get(name);
      },
      getDefaultLibFileName: () => '/lib/lib.d.ts',
      getDefaultLibLocation: () => '/lib',
      writeFile: () => {},
      getCurrentDirectory: () => '/',
      getDirectories: () => [],
      fileExists: fileName => fileName === KOAN || fileName === TYPES || libs.has(base(fileName)),
      readFile: fileName => (fileName === KOAN ? src : fileName === TYPES ? KOAN_TYPES : libs.get(base(fileName))),
      getCanonicalFileName: fileName => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => '\n',
    };
    const program = ts.createProgram([KOAN, TYPES], options, host);
    const checker = program.getTypeChecker();
    const file = program.getSourceFile(KOAN);
    const lineOf = node => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
    const show = type => checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
    const same = (a, b) => checker.isTypeAssignableTo(a, b) && checker.isTypeAssignableTo(b, a);

    // The type assertions: assert.type<Expected>(value) and assert.typeEqual<Actual, Expected>().
    const checks = new Map();
    const spans = [];
    const visit = node => {
      if (
        ts.isCallExpression(node) &&
        ts.isPropertyAccessExpression(node.expression) &&
        node.expression.expression.getText(file) === 'assert' &&
        ['type', 'typeEqual'].includes(node.expression.name.text)
      ) {
        spans.push([node.getStart(file), node.getEnd()]);
        const [first, second] = node.typeArguments ?? [];
        const [actualNode, expectedNode] = node.expression.name.text === 'type' ? [node.arguments[0], first] : [first, second];
        if (!actualNode || !expectedNode) {
          checks.set(lineOf(node), { ok: false, expected: '(a type argument)', actual: '(nothing)' });
        } else if ([actualNode, expectedNode].some(n => n.getText(file) === '___')) {
          checks.set(lineOf(node), { blank: true });
        } else {
          const actual = ts.isTypeNode(actualNode) ? checker.getTypeFromTypeNode(actualNode) : checker.getTypeAtLocation(actualNode);
          const expected = checker.getTypeFromTypeNode(expectedNode);
          checks.set(lineOf(node), { ok: same(actual, expected), expected: show(expected), actual: show(actual) });
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(file);

    // Every other type error stops the koan before it runs.
    const errors = [...program.getSyntacticDiagnostics(file), ...program.getSemanticDiagnostics(file)]
      .filter(d => d.start === undefined || !spans.some(([start, end]) => d.start >= start && d.start < end))
      .map(d => ({
        line: d.start === undefined ? 0 : file.getLineAndCharacterOfPosition(d.start).line + 1,
        message: `TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`,
      }));
    return { checks, errors };
  }

  /** Runs a whole koan (prelude + code + epilogue); returns its exit code and output lines. */
  return async function run(src) {
    const { checks, errors } = typeCheck(src);
    if (errors.length) {
      const lines = errors.flatMap(e => [{ stream: 'err', text: e.message }, ...(e.line ? [{ stream: 'err', text: `    at koan.js:${e.line}` }] : [])]);
      return { rc: 1, lines };
    }
    const { outputText, sourceMapText } = ts.transpileModule(src, {
      fileName: 'koan.ts',
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None, sourceMap: true },
    });
    const code = outputText.replace(/\n\/\/# sourceMappingURL=.*\s*$/, '\n');
    return runJavaScript(code, { mapLine: lineMapper(JSON.parse(sourceMapText).mappings), typeChecks: checks });
  };
}

/** Fetches lib.es2023.d.ts and every library file it refers to, directly or not. */
export async function loadLibs(read, name = 'lib.es2023.d.ts', libs = new Map()) {
  if (libs.has(name)) return libs;
  const text = await read(name);
  libs.set(name, text);
  const refs = [...text.matchAll(/\/\/\/ <reference lib="([^"]+)" \/>/g)].map(m => `lib.${m[1].toLowerCase()}.d.ts`);
  await Promise.all(refs.map(ref => loadLibs(read, ref, libs)));
  return libs;
}

// In a browser worker: load the compiler (a classic script that defines a global `ts`) and the
// library files from this folder, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  Error.stackTraceLimit = 50;
  const read = async name => {
    const response = await fetch(new URL(`./${name}`, import.meta.url));
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    return response.text();
  };
  const ready = (async () => {
    const [compiler, libs] = await Promise.all([read('typescript.js'), loadLibs(read)]);
    (0, eval)(`${compiler}\n//# sourceURL=typescript.js`);
    return { run: makeRunner(globalThis.ts, libs), version: globalThis.ts.version };
  })();
  ready.then(
    ({ version }) => self.postMessage({ type: 'ready', version: `TypeScript ${version}` }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const { run } = await ready;
    self.postMessage({ type: 'done', id: data.id, ...(await run(data.src)) });
  };
}
