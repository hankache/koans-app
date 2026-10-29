// Runs Go koans off the main thread, with Go's own compiler and linker, built for WebAssembly
// (languages/go/node.mjs builds them): each run compiles the koan, links it and runs the program,
// all in memory, on wasi.js. languages/go/node.mjs imports startGo to run koans the same way under Node.
//
// Protocol (src/lib/runtime/wasm-runtime.ts):
//   in  { type: 'run', id, src }
//   out { type: 'ready', version } | { type: 'loaderror', message }
//       { type: 'done', id, rc, lines: [{ stream: 'out' | 'err', text }] }
//       { type: 'crash', id, message, lines }
//
// The koan is compiled as koan_test.go, in package main whatever its package clause says (it's
// rewritten in place, so no line moves), beside a main file of our own that declares ___ and runs
// the koan's Test functions. Its imports of testing, testify's assert and require get the
// koans' own (support/), which print TAP.

import { MemFS, WASI } from './wasi.js';

export const KOAN = 'koan_test.go';

// The koans' packages, compiled at start in this order, each from support/<name>/<name>.go.
const SUPPORT = [
  ['testing', 'testing'],
  ['github.com/stretchr/testify/assert', 'assert'],
  ['github.com/stretchr/testify/require', 'require'],
];

const decoder = new TextDecoder();
const encoder = new TextEncoder();

/** Splits what a process writes into lines, per stream, in the order they were written. */
function lineCollector() {
  const lines = [];
  const partial = { 1: '', 2: '' };
  return {
    lines,
    write(fd, bytes) {
      const text = partial[fd] + decoder.decode(bytes);
      const parts = text.split('\n');
      partial[fd] = parts.pop();
      for (const p of parts) lines.push({ stream: fd === 1 ? 'out' : 'err', text: p });
    },
    flush() {
      for (const fd of [1, 2]) if (partial[fd]) lines.push({ stream: fd === 1 ? 'out' : 'err', text: partial[fd] });
      partial[1] = partial[2] = '';
      return lines;
    },
  };
}

/** The main file: ___ for the koan, and its tests, run by the koans' testing package. */
function mainFile(src) {
  const tests = [...src.matchAll(/^func\s+(Test[A-Z_0-9]\w*|Test)\s*\(\s*\w+\s+\*testing\.T\s*\)/gm)].map(m => m[1]);
  return `package main

import (
	koans_testing "testing"
	koans_assert "github.com/stretchr/testify/assert"
)

var ___ = koans_assert.Blank

func main() {
	koans_testing.Main([]koans_testing.InternalTest{${tests.map(t => `{Name: "${t}", F: ${t}}`).join(', ')}})
}
`;
}

/**
 * Loads Go: get(file) fetches one of this folder's files as bytes. Returns its version and run(src),
 * which compiles, links and runs a koan: { rc, lines }.
 */
export async function startGo(get) {
  const manifest = JSON.parse(decoder.decode(await get('go.json')));
  const fs = new MemFS();

  const parts = await Promise.all(manifest.compile.map(get));
  const whole = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  parts.reduce((at, p) => (whole.set(p, at), at + p.length), 0);
  const [compiler, linker] = await Promise.all([WebAssembly.compile(whole), get(manifest.link).then(b => WebAssembly.compile(b))]);

  const config = [];
  await Promise.all(
    Object.entries(manifest.packages).map(async ([path, file]) => {
      fs.write(`/go/${file}`, await get(file));
      config.push(`packagefile ${path}=/go/${file}`);
    }),
  );

  async function exec(module, args, out) {
    const wasi = new WASI({ args, env: { PWD: '/w', HOME: '/w', TMPDIR: '/w' }, fs, write: out.write });
    return wasi.start(await WebAssembly.instantiate(module, wasi.imports));
  }
  const importcfg = () => fs.write('/go/importcfg', encoder.encode(config.join('\n') + '\n'));
  const compile = (out, output, ...files) =>
    exec(compiler, ['compile', '-p', 'main', '-complete', '-trimpath', '/w=>', '-importcfg', '/go/importcfg', '-o', output, ...files], out);

  fs.dirs.add('/go/support');
  for (const [path, name] of SUPPORT) {
    importcfg();
    fs.write(`/w/${name}.go`, await get(`support/${name}/${name}.go`));
    const out = lineCollector();
    const rc = await exec(compiler, ['compile', '-p', path, '-trimpath', '/w=>', '-importcfg', '/go/importcfg', '-o', `/go/support/${name}.a`, `/w/${name}.go`], out);
    if (rc !== 0) throw new Error(`could not compile ${path}: ${out.flush().map(l => l.text).join('\n')}`);
    config.push(`packagefile ${path}=/go/support/${name}.a`);
  }
  importcfg();

  async function run(src) {
    const out = lineCollector();
    for (const f of [...fs.files.keys()]) if (f.startsWith('/w/')) fs.files.delete(f);
    fs.write(`/w/${KOAN}`, encoder.encode(src.replace(/^package\s+\w+/m, 'package main')));
    fs.write('/w/koan_main.go', encoder.encode(mainFile(src)));

    // Compiler and linker messages are the koan's errors: on stderr, whichever stream they used.
    const errors = lineCollector();
    const asErrors = { write: (_fd, bytes) => errors.write(2, bytes) };
    if ((await compile(asErrors, '/w/main.a', KOAN, 'koan_main.go')) !== 0) return { rc: 1, lines: errors.flush() };
    if ((await exec(linker, ['link', '-importcfg', '/go/importcfg', '-buildmode=exe', '-o', '/w/main.wasm', '/w/main.a'], asErrors)) !== 0) {
      return { rc: 1, lines: errors.flush() };
    }
    const program = await WebAssembly.compile(fs.read('/w/main.wasm'));
    const rc = await exec(program, ['koan.test'], out);
    return { rc, lines: out.flush() };
  }

  return { version: manifest.version.replace(/^go/, 'Go '), run };
}

/**
 * Takes from this worker what koan code must never reach: the site's saved files (caches), the
 * learner's saved progress (indexedDB), and the channel open tabs sync it over (BroadcastChannel).
 * Go programs run as WebAssembly with no way to call JavaScript, so this is a second fence.
 */
function lockDown(scope = globalThis) {
  for (const name of ['caches', 'indexedDB', 'BroadcastChannel']) {
    for (let o = scope; o; o = Object.getPrototypeOf(o)) Reflect.deleteProperty(o, name);
    if (name in scope) throw new Error(`could not remove ${name} from the worker`);
  }
}

if (typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope) {
  const get = async file => {
    const res = await fetch(new URL(file, import.meta.url));
    if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
    return new Uint8Array(await res.arrayBuffer());
  };
  let go = null;
  let ready = startGo(get)
    .then(g => {
      go = g;
      lockDown();
      self.postMessage({ type: 'ready', version: g.version });
    })
    .catch(err => self.postMessage({ type: 'loaderror', message: String(err) }));

  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    await ready;
    try {
      const { rc, lines } = await go.run(data.src);
      self.postMessage({ type: 'done', id: data.id, rc, lines });
    } catch (err) {
      self.postMessage({ type: 'crash', id: data.id, message: String(err), lines: [] });
    }
  };
}
