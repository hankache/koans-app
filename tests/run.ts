// Runs learner code the way the browser does (prelude + code + epilogue), on the same
// interpreter build under Node, so tests see its real output.
import { packs } from '../languages';
import { languages } from '../scripts/lib/languages.mjs';
import { parseRun, type Report } from '../src/lib/tap';
import type { RunResult } from '../src/lib/runtime/wasm-runtime';

export interface Runner {
  /** The raw run, as the worker would return it. */
  run(code: string): RunResult;
  /** The run as the result panel sees it. */
  report(code: string): Report;
  /** Lines the prelude adds before the learner's code. */
  offset: number;
}

const runners = new Map<string, Promise<Runner>>();

/** A runner for the language with this id, its interpreter loaded once per test file. */
export function runner(id: string): Promise<Runner> {
  if (!runners.has(id)) {
    runners.set(id, (async () => {
      const lang = languages.find(l => l.id === id);
      const pack = packs.find(p => p.id === id);
      if (!lang || !pack) throw new Error(`unknown language ${id}`);
      const engine = await lang.load();
      const prelude = lang.prelude();
      const offset = prelude.split('\n').length - 1;
      const run = (code: string): RunResult => engine.run(prelude + code + lang.epilogue);
      return { run, report: code => parseRun(run(code), code, offset, pack.errors), offset };
    })());
  }
  return runners.get(id)!;
}
