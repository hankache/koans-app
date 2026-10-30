export interface OutputLine {
  stream: 'out' | 'err';
  text: string;
}

export interface RunResult {
  rc: number;
  lines: OutputLine[];
  /** Set when the program was killed or the interpreter crashed. */
  aborted?: 'timeout' | 'crash';
  message?: string;
}

/**
 * A language's interpreter in a Web Worker, with a watchdog that kills runaway programs.
 *
 * The worker's protocol:  in  { type: 'run', id, src }
 *                         out { type: 'ready', version } | { type: 'loaderror', message }
 *                             { type: 'done', id, rc, lines: [{ stream, text }] }
 *                             { type: 'crash', id, message, lines }
 */
export class WasmRuntime {
  ready!: Promise<string>;
  private worker!: Worker;
  private nextId = 1;
  private pending = new Map<number, (r: RunResult) => void>();
  private timers = new Set<ReturnType<typeof setTimeout>>();
  private stopped = false;

  /** The interpreter starts once `after` resolves. */
  constructor(
    private workerUrl: string,
    private workerType: WorkerType = 'classic',
    after: Promise<unknown> = Promise.resolve(),
    private timeoutMs = 8000,
  ) {
    this.ready = after.then(() => this.spawn());
  }

  private spawn(): Promise<string> {
    // Stopped before it started (say, while waiting for the service worker): never start.
    if (this.stopped) return new Promise(() => {});
    this.worker = new Worker(this.workerUrl, { type: this.workerType });
    return new Promise((resolve, reject) => {
      this.worker.onmessage = ({ data }) => {
        switch (data.type) {
          case 'ready':
            return resolve(data.version);
          case 'loaderror':
            return reject(new Error(data.message));
          case 'done':
            return this.settle(data.id, { rc: data.rc, lines: data.lines });
          case 'crash':
            return this.settle(data.id, {
              rc: -1, lines: data.lines, aborted: 'crash', message: data.message,
            });
        }
      };
      this.worker.onerror = e => reject(new Error(e.message || 'The interpreter failed to start'));
    });
  }

  private settle(id: number, result: RunResult) {
    this.pending.get(id)?.(result);
    this.pending.delete(id);
  }

  async run(src: string): Promise<RunResult> {
    // Don't start the watchdog until the interpreter has loaded.
    await this.ready;
    if (this.stopped) return { rc: -1, lines: [], aborted: 'crash', message: 'The interpreter was stopped.' };
    const id = this.nextId++;
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        this.timers.delete(timer);
        // The interpreter is synchronous: the only way to stop it is to kill the worker.
        this.worker.terminate();
        this.pending.clear();
        this.ready = this.spawn();
        resolve({ rc: -1, lines: [], aborted: 'timeout' });
      }, this.timeoutMs);
      this.timers.add(timer);
      this.pending.set(id, r => {
        clearTimeout(timer);
        this.timers.delete(timer);
        resolve(r);
      });
      this.worker.postMessage({ type: 'run', id, src });
    });
  }

  /**
   * Ends the worker and frees the interpreter's memory, for good: a run in progress ends as a
   * crash. A language that's opened again gets a new runtime, which loads from the offline copy.
   */
  stop() {
    this.stopped = true;
    for (const timer of this.timers) clearTimeout(timer);
    this.timers.clear();
    this.worker?.terminate();
    for (const settle of this.pending.values()) {
      settle({ rc: -1, lines: [], aborted: 'crash', message: 'The interpreter was stopped.' });
    }
    this.pending.clear();
  }
}
