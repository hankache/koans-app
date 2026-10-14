// Runs Lua koans on wasmoon: Lua 5.4 compiled to WebAssembly. In the browser this is a module
// worker; under Node, the build tools import makeRunner() from it (languages/lua/node.mjs), so the
// checker and the tests use this same code.
//
// Every run gets a fresh Lua state (a millisecond or two), so globals a koan sets can't leak into
// the next run.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }

/**
 * Runs the koan, in the global koan_source, as a chunk named koan.lua, and reports an error it
 * didn't catch as stderr lines: the message, then the koan's line. Returns the exit code.
 */
const RUN_KOAN = `
local chunk, problem = load(koan_source, "=koan.lua")
local ok = chunk ~= nil
if ok then ok, problem = pcall(chunk) end
io.stdout:flush()
if ok then return 0 end
local text = type(problem) == "string" and problem or tostring(problem)
local line, message = text:match("^koan%.lua:(%d+): (.*)$")
io.stderr:write((chunk and "" or "syntax error: ") .. (message or text) .. "\\n")
if line then io.stderr:write("    at koan.lua:" .. line .. "\\n") end
return 1
`;

/** A runner on wasmoon: its LuaFactory, and where its glue.wasm is. */
export function makeRunner(LuaFactory, wasm) {
  // wasmoon keeps whichever console.log and console.error it finds when it loads, so those stay
  // pointed at one forwarder for good, which sends output to the run in progress, if any.
  let sink = null;
  const original = { log: console.log, warn: console.warn, error: console.error };
  const forward = (stream, fallback) => (...args) => (sink ? sink(stream, args.join(' ')) : fallback(...args));
  console.log = forward('out', original.log);
  console.warn = forward('err', original.warn);
  console.error = forward('err', original.error);
  const factory = new LuaFactory(wasm);

  return async function run(src) {
    const lines = [];
    sink = (stream, text) => {
      for (const t of text.replace(/\n$/, '').split('\n')) lines.push({ stream, text: t });
    };
    let lua;
    try {
      lua = await factory.createEngine();
      lua.global.set('koan_source', src);
      const rc = await lua.doString(RUN_KOAN);
      return { rc, lines };
    } catch (error) {
      return { rc: -1, lines, crash: String(error?.message ?? error) };
    } finally {
      lua?.global.close();
      sink = null;
    }
  };
}

// In a browser worker: load wasmoon's bundle (a script that defines a global), then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const bundle = await fetch(new URL('./index.js', import.meta.url));
    if (!bundle.ok) throw new Error(`index.js: HTTP ${bundle.status}`);
    (0, eval)(`${await bundle.text()}\n//# sourceURL=wasmoon.js`);
    return makeRunner(globalThis.wasmoon.LuaFactory, new URL('./glue.wasm', import.meta.url).href);
  })();
  ready.then(
    () => self.postMessage({ type: 'ready', version: 'wasmoon' }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const run = await ready;
    const { rc, lines, crash } = await run(data.src);
    self.postMessage(crash ? { type: 'crash', id: data.id, message: crash, lines } : { type: 'done', id: data.id, rc, lines });
  };
}
