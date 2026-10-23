// Runs OCaml koans on the toplevel of ocaml.org's playground: the OCaml compiler and toplevel,
// compiled to JavaScript by js_of_ocaml (worker.min.js), with the standard library's compiled
// interfaces (stdlib/*.cmi). In the browser this is a module worker; under Node, the build tools
// import makeRunner() and startToplevel() from it (languages/ocaml/node.mjs), so the checker and the
// tests use this same code.
//
// worker.min.js is itself a web worker, answering calls marshaled with OCaml's Marshal. Here it runs
// inside this worker instead: startToplevel() evaluates it, takes the message handler it installs,
// and calls it directly, marshaling with worker.min.js's own runtime. Every run gets a fresh toplevel
// (worker.min.js evaluated again, about 150 ms), so definitions a koan makes can't leak into the next
// run; in the browser, the next one is made while the learner reads the result.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

/** The standard library's compiled interfaces, as served in stdlib/: the toplevel reads them as needed. */
export const CMIS = `camlinternalFormat camlinternalFormatBasics camlinternalLazy camlinternalMod camlinternalOO
  std_exit stdlib stdlib__Arg stdlib__Array stdlib__ArrayLabels stdlib__Atomic stdlib__Bigarray stdlib__Bool
  stdlib__Buffer stdlib__Bytes stdlib__BytesLabels stdlib__Callback stdlib__Char stdlib__Complex stdlib__Condition
  stdlib__Digest stdlib__Domain stdlib__Effect stdlib__Either stdlib__Ephemeron stdlib__Filename stdlib__Float
  stdlib__Format stdlib__Fun stdlib__Gc stdlib__Hashtbl stdlib__In_channel stdlib__Int stdlib__Int32 stdlib__Int64
  stdlib__Lazy stdlib__Lexing stdlib__List stdlib__ListLabels stdlib__Map stdlib__Marshal stdlib__MoreLabels
  stdlib__Mutex stdlib__Nativeint stdlib__Obj stdlib__Oo stdlib__Option stdlib__Out_channel stdlib__Parsing
  stdlib__Printexc stdlib__Printf stdlib__Queue stdlib__Random stdlib__Result stdlib__Scanf stdlib__Semaphore
  stdlib__Seq stdlib__Set stdlib__Stack stdlib__StdLabels stdlib__String stdlib__StringLabels stdlib__Sys
  stdlib__Uchar stdlib__Unit stdlib__Weak topdirs unix unixLabels`
  .split(/\s+/)
  .map(name => `stdlib/${name}.cmi`);

// OCaml strings are bytes; JavaScript's are UTF-16. worker.min.js holds each byte as one character.
const toBytes = text => String.fromCharCode(...new TextEncoder().encode(text));
const fromBytes = bytes => new TextDecoder().decode(Uint8Array.from(bytes, c => c.charCodeAt(0)));

/**
 * Starts a fresh toplevel in `scope` (the worker's global object, or a Node vm context's):
 * runScript() evaluates worker.min.js there, `cmis` maps each of CMIS to its bytes, an ArrayBuffer
 * made in that scope, and `parse` is that scope's JSON.parse, to make OCaml values in its realm.
 * Returns the OCaml version and exec(phrases), which runs them and gives what they printed:
 * { stdout, stderr, results } (results: what the toplevel says of them).
 */
export function startToplevel(scope, runScript, cmis, parse = JSON.parse) {
  // What worker.min.js expects of a worker: an onmessage to replace, postMessage, importScripts, and
  // XMLHttpRequest, here answered from the files already loaded.
  class XMLHttpRequest {
    open(method, url) { this.url = url; }
    send() {
      this.response = cmis.get(this.url) ?? null;
      this.status = this.response ? 200 : 404;
    }
  }
  Object.assign(scope, { XMLHttpRequest, importScripts() {}, onmessage: null });
  runScript();
  const server = scope.onmessage;
  scope.onmessage = null;
  const runtime = scope.jsoo_runtime;
  if (typeof server !== 'function' || !runtime) throw new Error('worker.min.js did not start');

  // OCaml values as js_of_ocaml holds them: a block is [tag, ...fields], made in worker.min.js's realm.
  const list = items => items.reduceRight((tail, item) => [0, item, tail], 0);
  const text = s => [4, toBytes(s)];
  const dict = entries => [7, list(Object.entries(entries).map(([k, v]) => [0, k, v]))];
  const call = (name, params) => {
    const request = runtime.caml_output_value_to_bytes(parse(JSON.stringify([0, name, list(params), 0])), 0);
    let reply;
    const own = Object.hasOwn(scope, 'postMessage');
    const post = scope.postMessage;
    scope.postMessage = message => { reply = message; };
    try {
      server({ data: request });
    } finally {
      if (own) scope.postMessage = post;
      else delete scope.postMessage;
    }
    // Rpc.response: { success; contents; is_notification }, contents a Dict of optional strings.
    const [, success, contents] = runtime.caml_input_value_from_bytes(runtime.caml_bytes_of_string(reply), 0);
    const fields = {};
    for (let cell = contents[1]; cell !== 0 && contents[0] === 7; cell = cell[2]) {
      const [, key, value] = cell[1];
      if (value?.[0] === 4) fields[key] = fromBytes(value[1]);
    }
    if (!success) throw new Error(`toplevel ${name}: ${JSON.stringify(contents)}`);
    return fields;
  };

  call('init', [dict({ init_libs: dict({ cmi_urls: [6, list(CMIS.map(text))], cmas: [6, 0] }) })]);
  const banner = call('setup', [0]).stdout ?? '';
  return {
    version: `OCaml ${banner.match(/version (\S+)/)?.[1] ?? ''}`.trim(),
    exec(phrases) {
      const { stdout = '', stderr = '', caml_ppf = '' } = call('exec', [text(phrases)]);
      return { stdout, stderr, results: caml_ppf };
    },
  };
}

/** Top-level items start at the left margin with one of these words. */
const ITEM = /^(let|type|module|open|exception|external|include|class)\b/;
const OPENERS = new Set(['struct', 'sig', 'begin', 'object']);
/** After these words, check is being defined or bound, not called. */
const BINDERS = new Set(['let', 'and', 'rec', 'val', 'external', 'fun', 'function', 'method', 'type', 'module']);
const CHAR = /'(\\([\\'"ntbr ]|\d{3}|x[0-9a-fA-F]{2}|o[0-7]{3})|[^\\'\n])'/y;

/**
 * Splits the koan into its top-level items and rewrites it, without moving a line:
 *   ___                      →  (Obj.magic Alcotest.blank)
 *   check int "why" a b      →  (Alcotest.check_at 7) int "why" a b       its line
 *   check_raises "why" e f   →  (Alcotest.check_raises_at 8) "why" e f
 * Strings, character literals and comments are left alone. `first` is the koan's first line in
 * the program. Returns [{ line, code }], one per item.
 */
export function items(koan, first) {
  let out = '';
  let i = 0;
  let line = first;
  let depth = 0;
  let previous = '';
  const starts = new Set();
  const atLineStart = () => {
    if (depth === 0 && ITEM.test(koan.slice(i, i + 12))) starts.add(line);
  };
  atLineStart();
  const copy = n => {
    for (const c of koan.slice(i, i + n)) {
      out += c;
      if (c === '\n') line++;
    }
    i += n;
  };
  while (i < koan.length) {
    const c = koan[i];
    if (c === '\n') {
      copy(1);
      atLineStart();
    } else if (koan.startsWith('(*', i)) {
      let nesting = 0;
      do {
        if (koan.startsWith('(*', i)) { nesting++; copy(2); }
        else if (koan.startsWith('*)', i)) { nesting--; copy(2); }
        else if (koan[i] === '"') copyString();
        else copy(1);
      } while (nesting > 0 && i < koan.length);
    } else if (c === '"') {
      copyString();
      previous = '"';
    } else if (c === '{' && /^\{[a-z_]*\|/.test(koan.slice(i, i + 20))) {
      const id = koan.slice(i + 1, koan.indexOf('|', i));
      const end = koan.indexOf(`|${id}}`, i);
      copy(end < 0 ? koan.length - i : end + id.length + 2 - i);
      previous = '"';
    } else if (c === "'") {
      CHAR.lastIndex = i;
      copy(CHAR.test(koan) ? CHAR.lastIndex - i : 1);
      previous = "'";
    } else if (/[A-Za-z_]/.test(c)) {
      const word = koan.slice(i).match(/^[A-Za-z_][A-Za-z0-9_']*/)[0];
      const before = koan[i - 1];
      const bare = before !== '.' && before !== '~' && before !== '?' && !BINDERS.has(previous);
      if (word === '___') out += '(Obj.magic Alcotest.blank)';
      else if ((word === 'check' || word === 'check_raises') && bare) out += `(Alcotest.${word}_at ${line})`;
      else out += word;
      if (OPENERS.has(word)) depth++;
      if (word === 'end') depth--;
      i += word.length;
      previous = word;
    } else {
      if ('([{'.includes(c)) depth++;
      if (')]}'.includes(c)) depth--;
      if (!/\s/.test(c)) previous = c;
      copy(1);
    }
  }

  function copyString() {
    copy(1);
    while (i < koan.length && koan[i] !== '"') copy(koan[i] === '\\' ? 2 : 1);
    copy(1);
  }

  // Lines before the first item (comments) go with it.
  const lines = out.split('\n');
  const result = [];
  lines.forEach((text, n) => {
    const at = first + n;
    if (starts.has(at) || !result.length) result.push({ line: at, code: text });
    else result[result.length - 1].code += `\n${text}`;
  });
  return result.filter(item => item.code.trim());
}

/**
 * Runs the prelude in a fresh toplevel, which then waits for a koan. The prelude takes most of a
 * run's time (about 400 ms), so the browser's worker does this ahead, while the learner reads.
 */
export function withPrelude(toplevel, prelude) {
  const { stderr } = toplevel.exec(`${prelude}\n;;`);
  if (stderr.includes('Error')) throw new Error(`the prelude failed: ${stderr}`);
  return toplevel;
}

/**
 * A runner: load(prelude) gives a fresh toplevel that has run the prelude (see startToplevel and
 * withPrelude). The program is the prelude, on line 1, then the koan; each item runs on its own,
 * after the prelude's Alcotest.line is set to its line. An error stops the koan there, reported as
 * its message and "    at koan.ml:line".
 */
export function makeRunner(load) {
  return function run(src) {
    const lines = [];
    const out = text => lines.push({ stream: 'out', text });
    const err = text => lines.push({ stream: 'err', text });
    const newline = src.indexOf('\n');
    const toplevel = load(src.slice(0, newline));

    for (const item of items(src.slice(newline + 1), 2)) {
      const { stdout, stderr, results } = toplevel.exec(`Alcotest.line := ${item.line};; ${item.code}\n;;`);
      for (const text of stdout.replace(/\n$/, '').split('\n')) {
        if (!stdout) break;
        if (text.startsWith('\x01')) err(text.slice(1));
        else out(text);
      }
      // A compile error: "Line 3, characters 4-9:" (or "Lines 3-5", or 'File "_none_", line 3'),
      // then "Error: " and its message, over one or more lines, sometimes followed by a note with
      // a place of its own, such as where an unclosed ( was opened: the better line to show.
      const at = stderr.indexOf('Error: ');
      if (at >= 0) {
        const place = /\b[Ll]ines? (\d+)[^\n]*\n/g;
        const where = [...stderr.slice(0, at).matchAll(place)].pop();
        const message = stderr.slice(at + 7);
        const note = place.exec(message);
        const unmatched = note && /unmatched|unclosed/.test(message.slice(note.index)) ? note : null;
        const lineIn = Number((unmatched ?? where)?.[1] ?? 1);
        err((note ? message.slice(0, note.index) : message).replace(/\s+/g, ' ').trim());
        err(`    at koan.ml:${item.line + Math.min(lineIn, item.code.split('\n').length) - 1}`);
        return { rc: 1, lines };
      }
      for (const text of stderr ? stderr.replace(/\n$/, '').split('\n') : []) err(text);
      const raised = results.match(/^Exception: ([\s\S]*?)\.?\s*$/m);
      if (raised) {
        err(`Exception: ${raised[1].replace(/\s+/g, ' ')}`);
        err(`    at koan.ml:${item.line}`);
        return { rc: 1, lines };
      }
    }
    return { rc: 0, lines };
  };
}

/**
 * Takes from this worker what koan code must never reach: the site's saved files (caches), the
 * learner's saved progress (indexedDB), and the channel open tabs sync it over (BroadcastChannel),
 * all shared with the page. Koans don't need them, and code from a shared link could otherwise
 * rewrite the site's offline copy or the learner's progress. Run once the interpreter has loaded,
 * before any koan. Removed from the global object and every prototype above it, so they can't be
 * found again; if one can't be removed, this throws rather than run koans with it.
 */
function lockDown(scope = globalThis) {
  for (const name of ['caches', 'indexedDB', 'BroadcastChannel']) {
    for (let o = scope; o; o = Object.getPrototypeOf(o)) Reflect.deleteProperty(o, name);
    if (name in scope) throw new Error(`could not remove ${name} from the worker`);
  }
}

// In a browser worker: fetch worker.min.js and the standard library's interfaces once, start a
// toplevel for each run, and answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const get = async file => {
      const response = await fetch(new URL(file, import.meta.url));
      if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
      return response;
    };
    const [script, ...interfaces] = await Promise.all([
      get('worker.min.js').then(r => r.text()),
      ...CMIS.map(file => get(file).then(r => r.arrayBuffer())),
    ]);
    const cmis = new Map(CMIS.map((file, n) => [file, interfaces[n]]));
    const source = `${script}\n//# sourceURL=worker.min.js`;
    const fresh = () => startToplevel(self, () => (0, eval)(source), cmis);
    const { version } = fresh();
    lockDown();
    // The next run's toplevel, made ahead with the prelude the last run had.
    let next = null;
    let lastPrelude = null;
    const take = prelude => {
      const toplevel = next?.prelude === prelude ? next.toplevel : withPrelude(fresh(), prelude);
      next = null;
      lastPrelude = prelude;
      return toplevel;
    };
    const prepare = () => {
      if (!next && lastPrelude) next = { prelude: lastPrelude, toplevel: withPrelude(fresh(), lastPrelude) };
    };
    return { run: makeRunner(take), version, prepare };
  })();
  ready.then(
    ({ version }) => self.postMessage({ type: 'ready', version }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.addEventListener('message', async ({ data }) => {
    if (data?.type !== 'run') return;
    const { run, prepare } = await ready;
    self.postMessage({ type: 'done', id: data.id, ...run(data.src) });
    setTimeout(prepare, 0);
  });
}
