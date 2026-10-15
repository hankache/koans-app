// Runs PHP koans on php-wasm: PHP 8.5 compiled to WebAssembly. In the browser this is a module
// worker; under Node, the build tools import makeRunner() from it (languages/php/node.mjs), so the
// checker and the tests use this same code, on the same build of PHP.
//
// Every run gets a fresh PHP: functions, classes and constants a koan declares would otherwise
// last into the next run, where declaring them again is a fatal error. The compiled module is
// kept, so a new PHP takes a hundred milliseconds or so.
//
// The koan is written to /koan.php and required by a small script that reports an error the koan
// didn't catch as stderr lines: the error, then the koan's line.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }
import { PhpBase } from './PhpBase.mjs';

/** The build of PHP, and its WebAssembly file (named by php-wasm after its hash). */
export const PHP_BUILD = './php8.5-web.mjs';
export const PHP_WASM = '680a122bfdab5d7d3e949a54f8e97cc99bc7b305.wasm';

/**
 * php-wasm's web build keeps references to `document` and `window` for Emscripten's HTML5 APIs
 * (canvas, fullscreen, pointer lock), which PHP never calls; a worker and Node have neither. They
 * stand in only while PHP starts: left on Node's global object, they would make other WebAssembly
 * runtimes (Lua's) think they're in a page.
 */
async function withStandIns(start) {
  const missing = ['window', 'document'].filter(name => !(name in globalThis));
  if (missing.includes('window')) globalThis.window = globalThis;
  if (missing.includes('document')) globalThis.document = {};
  try {
    return await start();
  } finally {
    for (const name of missing) delete globalThis[name];
  }
}

/** Unbuffered output, every error reported, and no HTML in messages. */
const INI = 'html_errors=0\noutput_buffering=0\nimplicit_flush=1\nerror_reporting=E_ALL';

/**
 * Requires the koan, and reports what it didn't catch on stderr: what went wrong, then the koan's
 * line. /rc records whether the koan stopped with an error.
 */
const RUN_KOAN = `<?php
ini_set('display_errors', '0');
file_put_contents('/rc', '0');
function koan_fail(string $what, int $line): void {
  // Line numbers inside a message are the file's; the learner's are one less (the prelude's line).
  $what = preg_replace_callback('~(?:in )?/koan\\.php(?::| on line )(\\d+)~', fn($m) => 'on line ' . ($m[1] - 1), $what);
  $err = fopen('php://stderr', 'w');
  fwrite($err, $what . "\\n" . ($line ? "    at koan.php:$line\\n" : ''));
  file_put_contents('/rc', '1');
}
try {
  require '/koan.php';
} catch (\\Throwable $e) {
  $line = $e->getFile() === '/koan.php' ? $e->getLine() : 0;
  if (!$line) {
    foreach ($e->getTrace() as $frame) {
      if (($frame['file'] ?? '') === '/koan.php') { $line = $frame['line']; break; }
    }
  }
  // A warning or notice the prelude turned into an ErrorException is named as PHP names it.
  $kind = $e instanceof ErrorException
    ? match ($e->getSeverity()) { E_WARNING, E_USER_WARNING => 'Warning', E_NOTICE, E_USER_NOTICE => 'Notice', E_DEPRECATED, E_USER_DEPRECATED => 'Deprecated', default => 'ErrorException' }
    : get_class($e);
  koan_fail($kind . ': ' . $e->getMessage(), $line);
}
`;

/**
 * Run after RUN_KOAN, in the same PHP: reports a fatal error that isn't an exception (declaring a
 * function twice, say), which ends the koan's script without reaching its catch. (php-wasm never
 * ends PHP's request between scripts, so a shutdown function wouldn't run.)
 */
const REPORT_FATAL = `<?php
$e = error_get_last();
if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR, E_USER_ERROR], true) && file_get_contents('/rc') === '0') {
  koan_fail('Fatal error: ' . $e['message'], $e['file'] === '/koan.php' ? $e['line'] : 0);
}
`;

/**
 * A runner on php-wasm: PhpBase, the build's module factory (a promise of its import), and the
 * compiled WebAssembly module.
 */
export function makeRunner(factory, module) {
  return async function run(src) {
    const lines = [];
    const php = new PhpBase(factory, {
      ini: INI,
      instantiateWasm(imports, done) {
        WebAssembly.instantiate(module, imports).then(instance => done(instance, module));
        return {};
      },
    });
    const take = stream => event => {
      for (const chunk of event.detail) {
        for (const text of String(chunk).replace(/\n$/, '').split('\n')) lines.push({ stream, text });
      }
    };
    php.addEventListener('output', take('out'));
    php.addEventListener('error', take('err'));
    try {
      await withStandIns(() => php.binary);
      await php.writeFile('/koan.php', src);
      await php.run(RUN_KOAN);
      await php.run(REPORT_FATAL);
      php.flush();
      const rc = Number(await php.readFile('/rc', { encoding: 'utf8' }));
      return { rc, lines };
    } catch (error) {
      // PHP itself failed (the WebAssembly stack ran out, say): there is no PHP error to report.
      php.flush();
      return { rc: -1, lines, crash: String(error?.message ?? error) };
    }
  };
}

// In a browser worker: compile PHP once, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const factory = import(PHP_BUILD);
    const module = await WebAssembly.compileStreaming(fetch(new URL(PHP_WASM, import.meta.url)));
    const run = makeRunner(factory, module);
    const { lines } = await run('<?php echo PHP_VERSION;');
    return { run, version: `PHP ${lines[0]?.text ?? ''}`.trim() };
  })();
  ready.then(
    ({ version }) => self.postMessage({ type: 'ready', version }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const { run } = await ready;
    const { rc, lines, crash } = await run(data.src);
    self.postMessage(crash ? { type: 'crash', id: data.id, message: crash, lines } : { type: 'done', id: data.id, rc, lines });
  };
}
