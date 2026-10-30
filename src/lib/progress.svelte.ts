// Learner progress, kept in this browser's IndexedDB and shared by the site's open tabs.
import { get, set, update } from 'idb-keyval';
import { keepForGood } from './storage';

export interface KoanProgress {
  status: 'attempted' | 'passed';
  code: string;
  attempts: number;
  passedAt: string | null;
  updatedAt: string;
}

export type ProgressMap = Record<string, KoanProgress>;

// reload: another tab changed many entries at once (an import); read them all again.
type Message = { id: string; entry: KoanProgress } | { reset: true } | { reload: true };

/** One language's progress. */
export class Progress {
  map = $state<ProgressMap>({});
  loaded = $state(false);
  private key: string;
  // Each saved change is announced here, so the site's other open tabs show it too.
  private channel: BroadcastChannel | null;
  private started?: Promise<void>;

  constructor(language: string) {
    this.key = `koans:${language}:progress`;
    this.channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(this.key);
    this.channel?.addEventListener('message', ({ data }: MessageEvent<Message>) => {
      if ('reset' in data) this.map = {};
      else if ('reload' in data) void this.init();
      else this.accept(data.id, data.entry);
    });
  }

  /** Loads the saved progress, once; later calls wait for the same load. */
  ready(): Promise<void> {
    return (this.started ??= this.init());
  }

  /** Loads the saved progress (again). */
  async init() {
    try {
      const map = (await get<ProgressMap>(this.key)) ?? {};
      // Keep anything newer that this tab already has: another tab may have announced it while
      // this one was loading.
      for (const [id, entry] of Object.entries($state.snapshot(this.map))) {
        if (!map[id] || map[id].updatedAt < entry.updatedAt) map[id] = entry;
      }
      this.map = map;
    } catch {
      // Private mode or blocked storage: keep going in memory.
    }
    this.loaded = true;
  }

  get(id: string): KoanProgress | undefined {
    return this.map[id];
  }

  /** Called after every run. The latest run decides: breaking a solved koan un-passes it. */
  record(id: string, code: string, passed: boolean) {
    const now = new Date().toISOString();
    const next = (prev?: KoanProgress): KoanProgress => ({
      code,
      attempts: (prev?.attempts ?? 0) + 1,
      status: passed ? 'passed' : 'attempted',
      passedAt: passed ? (prev?.passedAt ?? now) : null,
      updatedAt: now,
    });
    this.map[id] = next(this.map[id]);
    void this.save(id, next);
    // Something worth keeping now: ask the browser not to clear it (once per visit).
    if (passed) void keepForGood();
  }

  /** Restores a koan's starting code. Its status stays until the next run re-evaluates it. */
  resetCode(id: string, starter: string) {
    const now = new Date().toISOString();
    const next = (prev?: KoanProgress) => prev && { ...prev, code: starter, updatedAt: now };
    const entry = next(this.map[id]);
    if (!entry) return;
    this.map[id] = entry;
    void this.save(id, next);
  }

  /** Forgets everything, in every tab: passes, attempts and saved code. */
  async resetAll() {
    this.map = {};
    try {
      await set(this.key, {});
    } catch {
      /* storage unavailable */
    }
    this.channel?.postMessage({ reset: true } satisfies Message);
  }

  /** Everything saved, for an export. */
  snapshot(): ProgressMap {
    return $state.snapshot(this.map);
  }

  /**
   * Adds imported entries, in one transaction: for each koan, the newer of the saved and the
   * imported entry wins, so an import never undoes later work. Returns how many entries it took.
   * Every open tab then reloads.
   */
  async merge(entries: ProgressMap): Promise<number> {
    let taken = 0;
    try {
      await update<ProgressMap>(this.key, stored => {
        const map = { ...(stored ?? {}) };
        for (const [id, entry] of Object.entries(entries)) {
          if (!map[id] || map[id].updatedAt < entry.updatedAt) {
            map[id] = entry;
            taken++;
          }
        }
        return map;
      });
    } catch {
      // Storage unavailable: take them in memory only.
      for (const [id, entry] of Object.entries(entries)) {
        if (!this.map[id] || this.map[id].updatedAt < entry.updatedAt) {
          this.map[id] = entry;
          taken++;
        }
      }
      return taken;
    }
    await this.init();
    this.channel?.postMessage({ reload: true } satisfies Message);
    return taken;
  }

  /** Stops listening to other tabs. */
  close() {
    this.channel?.close();
  }

  /** Takes an entry saved by this tab or another, unless this tab already has a newer one. */
  private accept(id: string, entry: KoanProgress) {
    const mine = this.map[id];
    if (!mine || mine.updatedAt <= entry.updatedAt) this.map[id] = entry;
  }

  /**
   * Applies a change to one koan's saved entry. Reading and writing happen in one transaction,
   * so tabs saving at the same moment can't undo each other's changes; the change is applied to
   * what's stored, which may include runs from other tabs. Then the other tabs are told.
   */
  private async save(id: string, change: (prev?: KoanProgress) => KoanProgress | undefined) {
    let entry: KoanProgress | undefined;
    try {
      await update<ProgressMap>(this.key, stored => {
        const map = stored ?? {};
        entry = change(map[id]);
        return entry ? { ...map, [id]: entry } : map;
      });
    } catch {
      return; // storage unavailable: this tab keeps going in memory
    }
    if (!entry) return;
    this.accept(id, entry);
    this.channel?.postMessage({ id, entry } satisfies Message);
  }
}

const stores = new Map<string, Progress>();

/** The progress of the language with this id: one store per language, shared by the whole page. */
export function progressFor(language: string): Progress {
  let store = stores.get(language);
  if (!store) stores.set(language, (store = new Progress(language)));
  return store;
}
