// Runs learner code the way the browser does (prelude + code + epilogue), on the same
// Raku.js build under Node, so tests see the interpreter's real output.
import { EPILOGUE, readPrelude } from '../scripts/lib/koans.mjs';
import { loadRaku } from '../scripts/lib/raku-node.mjs';
import { parseRun, type Report } from '../src/lib/tap';
import type { RunResult } from '../src/lib/runtime/wasm-runtime';

const prelude = readPrelude();
const PRELUDE_LINES = prelude.split('\n').length - 1;
const raku = await loadRaku();

/** The raw run, as the worker would return it. */
export const run = (code: string): RunResult => raku.run(prelude + code + EPILOGUE);

/** The run as the result panel sees it. */
export const report = (code: string): Report => parseRun(run(code), code, PRELUDE_LINES);

export { PRELUDE_LINES };
