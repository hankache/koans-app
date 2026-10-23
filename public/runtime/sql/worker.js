// Runs SQL koans on sql.js: SQLite compiled to WebAssembly. In the browser this is a module
// worker; under Node, the build tools import makeRunner() from it (languages/sql/node.mjs), so the
// checker and the tests use this same code.
//
// SQL has no assertions of its own, so a koan's tests are queries followed by the rows they should
// give, written as SQL values in a comment:
//
//   -- The oldest person
//   SELECT name FROM people ORDER BY age DESC LIMIT 1;
//   -- expect: 'Grace'
//
// One row of values is written `'Ada', 36`; several rows `('Ada', 36), ('Alan', 41)`; no rows
// `nothing`. A statement that should fail expects `error`, or `error: <part of its message>`. SQLite works out the expected rows itself (it runs them as VALUES), so expressions
// like 1.0 / 3 work. A comment just above the query describes it. The runner prints TAP, as every
// language's tests do: a query that fails or still has a blank is a failed test, and the koan
// carries on. A statement without an expectation runs as it is (a SELECT prints its rows); if it
// fails, the koan stops there, like an uncaught error.
//
// Every run gets a fresh, empty database.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }

/**
 * Splits a koan into its statements and comments, each with its line (1-based). Strings, quoted
 * names and comments can hold `;`, and so can a trigger's body, up to its END.
 */
export function parseKoan(src) {
  const items = [];
  let line = 1;
  let text = '';
  let start = null;
  const finish = endLine => {
    if (start !== null && text.trim()) items.push({ kind: 'statement', text: text.trim(), line: start, endLine });
    text = '';
    start = null;
  };
  for (let i = 0; i < src.length; ) {
    const c = src[i];
    if (c === '\n') {
      if (start !== null) text += c;
      line++;
      i++;
    } else if (c === '-' && src[i + 1] === '-') {
      const end = src.indexOf('\n', i);
      const stop = end < 0 ? src.length : end;
      items.push({ kind: 'comment', text: src.slice(i + 2, stop).trim(), line });
      i = stop;
    } else if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const stop = end < 0 ? src.length : end + 2;
      line += (src.slice(i, stop).match(/\n/g) ?? []).length;
      if (start !== null) text += ' ';
      i = stop;
    } else if (/\s/.test(c) && start === null) {
      i++;
    } else {
      if (start === null) start = line;
      const close = { "'": "'", '"': '"', '`': '`', '[': ']' }[c];
      if (close) {
        // A quoted string or name, where a doubled quote stands for itself.
        let j = i + 1;
        while (j < src.length && !(src[j] === close && src[j + 1] !== close)) j += src[j] === close ? 2 : 1;
        const quoted = src.slice(i, j + 1);
        line += (quoted.match(/\n/g) ?? []).length;
        text += quoted;
        i = j + 1;
      } else if (c === ';' && !(/^CREATE\s+(TEMP\w*\s+)?TRIGGER\b/i.test(text.trim()) && !/\bEND$/i.test(text.trim()))) {
        finish(line);
        i++;
      } else {
        text += c;
        i++;
      }
    }
  }
  finish(line);
  return items;
}

/**
 * The koan's statements, each with its description (the comments just above it) and its
 * expectation (an `-- expect:` comment after it, before the next statement), if any.
 */
export function statementsOf(src) {
  const items = parseKoan(src);
  const statements = [];
  for (const [i, item] of items.entries()) {
    if (item.kind === 'statement') {
      const above = [];
      for (let j = i - 1, next = item.line; j >= 0 && items[j].kind === 'comment' && items[j].line === next - 1; j--) {
        if (/^expect:/i.test(items[j].text)) break;
        above.unshift(items[j].text);
        next = items[j].line;
      }
      statements.push({ ...item, description: above.join(' ') });
    } else if (/^expect:/i.test(item.text) && statements.length && !statements.at(-1).expect && item.line >= statements.at(-1).endLine) {
      statements.at(-1).expect = { text: item.text.replace(/^expect:\s*/i, ''), line: item.line };
    }
  }
  return statements;
}

/** A value the way SQL writes it: 'text', 42, NULL. */
const format = value =>
  value === null ? 'NULL'
  : typeof value === 'string' ? `'${value.replace(/'/g, "''")}'`
  : value instanceof Uint8Array ? `X'${[...value].map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()}'`
  : String(value);

/** Rows the way an expectation writes them: 'Ada', 36 for one row; ('Ada', 36), ('Alan', 41) for several. */
const formatRows = rows =>
  !rows.length ? 'nothing'
  : rows.length === 1 ? rows[0].map(format).join(', ')
  : rows.map(row => `(${row.map(format).join(', ')})`).join(', ');

const sameRows = (a, b) => a.length === b.length && a.every((row, i) => row.length === b[i].length && row.every((v, j) => Object.is(v, b[i][j]) || (v instanceof Uint8Array && format(v) === format(b[i][j]))));

/** A runner on sql.js: its SQL object (from initSqlJs). */
export function makeRunner(SQL) {
  return async function run(src) {
    const lines = [];
    const out = text => lines.push({ stream: 'out', text });
    const err = text => lines.push({ stream: 'err', text });
    const srcLines = src.split('\n');
    // The line to blame for a failed test: the first one with a blank, or else the expectation's.
    const blameLine = s => {
      const last = s.expect?.line ?? s.endLine;
      for (let l = s.line; l <= last; l++) if (srcLines[l - 1]?.includes('___')) return l;
      return s.expect?.line ?? s.line;
    };
    const rowsOf = (db, sql) => db.exec(sql).at(-1)?.values ?? [];

    const db = new SQL.Database();
    let tests = 0;
    try {
      for (const s of statementsOf(src)) {
        const hasBlank = s.text.includes('___') || s.expect?.text.includes('___');
        if (!s.expect && !hasBlank) {
          // A plain statement: it runs as it is, and a SELECT shows its rows.
          let results;
          try {
            results = db.exec(s.text);
          } catch (e) {
            err(String(e.message ?? e));
            err(`    at koan.sql:${s.line}`);
            return { rc: 1, lines };
          }
          for (const { columns, values } of results) {
            out(columns.join(' | '));
            for (const row of values) out(row.map(v => (v === null ? 'NULL' : String(v))).join(' | '));
          }
          continue;
        }
        tests++;
        const report = (ok, diag = []) => {
          out(`${ok ? 'ok' : 'not ok'} ${tests}${s.description ? ` - ${s.description}` : ''}`);
          if (!ok) {
            for (const d of diag) err(`# ${d}`);
            err(`# at web line ${blameLine(s)}`);
          }
        };
        if (hasBlank) {
          report(false);
          continue;
        }
        const wantError = s.expect.text.trim().match(/^error\b:?\s*(.*)$/i);
        if (wantError) {
          const wanted = wantError[1];
          let problem = null;
          let rows;
          try {
            rows = rowsOf(db, s.text);
          } catch (e) {
            problem = String(e.message ?? e);
          }
          const ok = problem !== null && problem.toLowerCase().includes(wanted.toLowerCase());
          report(ok, [`expected: an error${wanted ? ` mentioning ${wanted}` : ''}`, `     got: ${problem ?? formatRows(rows)}`]);
          continue;
        }
        let expected;
        try {
          const e = s.expect.text.trim();
          expected = /^nothing$/i.test(e) ? [] : rowsOf(db, `SELECT * FROM (VALUES ${e.startsWith('(') ? e : `(${e})`})`);
        } catch (e) {
          report(false, [`the expectation is not valid SQL: ${e.message ?? e}`]);
          continue;
        }
        let actual;
        try {
          actual = rowsOf(db, s.text);
        } catch (e) {
          report(false, [`SQLite says: ${e.message ?? e}`]);
          continue;
        }
        report(sameRows(expected, actual), [`expected: ${formatRows(expected)}`, `     got: ${formatRows(actual)}`]);
      }
      return { rc: 0, lines };
    } finally {
      db.close();
    }
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

// In a browser worker: load sql.js (a script that defines initSqlJs), then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    const bundle = await fetch(new URL('./sql-wasm.js', import.meta.url));
    if (!bundle.ok) throw new Error(`sql-wasm.js: HTTP ${bundle.status}`);
    (0, eval)(`${await bundle.text()}\n//# sourceURL=sql-wasm.js`);
    const SQL = await globalThis.initSqlJs({ locateFile: file => new URL(`./${file}`, import.meta.url).href });
    lockDown();
    return makeRunner(SQL);
  })();
  ready.then(
    () => self.postMessage({ type: 'ready', version: 'sql.js' }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const run = await ready;
    self.postMessage({ type: 'done', id: data.id, ...(await run(data.src)) });
  };
}
