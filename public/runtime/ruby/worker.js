// Runs Ruby koans on ruby.wasm: CRuby compiled to WebAssembly, without its standard library. In
// the browser this is a module worker; under Node, the build tools import makeRunner() from it
// (languages/ruby/node.mjs), so the checker and the tests use this same code.
//
// Every run gets a fresh Ruby: classes, constants and methods a koan defines would otherwise last
// into the next run (re-running a koan that defines `class Dog < Animal` must not find an old Dog).
// The compiled module is kept, so a new Ruby takes a few hundred milliseconds.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }

/** A JavaScript string as a Ruby string literal. (JSON's escapes are Ruby's too; # mustn't start an interpolation.) */
export const rubyString = text => JSON.stringify(text).replace(/#/g, '\\u0023');

/**
 * Runs the koan, set in $koan_source, at the top level as a file named koan.rb, and reports an
 * error it didn't rescue as stderr lines: the error, then the koan's line. Its value is the exit code.
 */
const RUN_KOAN = `
begin
  eval($koan_source, TOPLEVEL_BINDING, "koan.rb", 1)
  0
rescue Exception => e
  line = (e.backtrace_locations || []).find { |l| l.path == "koan.rb" && l.lineno > 1 }&.lineno
  message = e.message.lines.first.to_s.chomp
  if e.is_a?(SyntaxError)
    line ||= e.message[/koan\\.rb:(\\d+)/, 1]&.to_i
    # Ruby points under the code with ^ and explains after it (in colour, for a terminal).
    found = e.message.gsub(/\\e\\[[\\d;]*m/, "").lines.find { |l| l.match?(/\\|\\s*\\^/) }
    message = found ? found[/\\^[\\^~]*\\s*(.*)/, 1].strip : "syntax error"
  end
  $stderr.puts "#{e.class}: #{message}"
  $stderr.puts "    at koan.rb:#{line}" if line && line > 0
  1
end
`;

/** A runner on ruby.wasm: `DefaultRubyVM` from ruby.wasm's browser bundle, and the compiled module. */
export function makeRunner(DefaultRubyVM, module) {
  return async function run(src) {
    // Ruby's output reaches us in chunks, through console.log (stdout) and console.warn (stderr).
    const lines = [];
    const partial = { out: '', err: '' };
    const write = stream => chunk => {
      partial[stream] += String(chunk);
      let end;
      while ((end = partial[stream].indexOf('\n')) >= 0) {
        lines.push({ stream, text: partial[stream].slice(0, end) });
        partial[stream] = partial[stream].slice(end + 1);
      }
    };
    const flush = () => {
      for (const stream of ['out', 'err']) if (partial[stream]) lines.push({ stream, text: partial[stream] });
    };
    const { log, warn } = console;
    console.log = write('out');
    console.warn = write('err');
    try {
      const { vm } = await DefaultRubyVM(module);
      const rc = Number(vm.eval(`$koan_source = ${rubyString(src)}\n${RUN_KOAN}`).toString());
      flush();
      return { rc, lines };
    } catch (error) {
      // Ruby itself failed (the WebAssembly stack ran out, say): there is no Ruby error to report.
      flush();
      return { rc: -1, lines, crash: String(error?.message ?? error) };
    } finally {
      console.log = log;
      console.warn = warn;
    }
  };
}

// In a browser worker: load ruby.wasm's bundle (a script that defines a global) and compile Ruby
// once, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const bundle = await fetch(new URL('./browser.umd.js', import.meta.url));
    if (!bundle.ok) throw new Error(`browser.umd.js: HTTP ${bundle.status}`);
    (0, eval)(`${await bundle.text()}\n//# sourceURL=browser.umd.js`);
    const module = await WebAssembly.compileStreaming(fetch(new URL('./ruby.wasm', import.meta.url)));
    return makeRunner(globalThis['ruby-wasm-wasi'].DefaultRubyVM, module);
  })();
  ready.then(
    () => self.postMessage({ type: 'ready', version: 'ruby.wasm' }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const run = await ready;
    const { rc, lines, crash } = await run(data.src);
    self.postMessage(crash ? { type: 'crash', id: data.id, message: crash, lines } : { type: 'done', id: data.id, rc, lines });
  };
}
