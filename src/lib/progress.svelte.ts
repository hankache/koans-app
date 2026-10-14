// Learner progress, kept in this browser's IndexedDB and shared by the site's open tabs.
import { get, set, update } from 'idb-keyval';

export interface KoanProgress {
  status: 'attempted' | 'passed';
  code: string;
  attempts: number;
  passedAt: string | null;
  updatedAt: string;
}

type ProgressMap = Record<string, KoanProgress>;

const STORAGE_KEY = 'raku-koans:progress';
// Each saved change is announced here, so the site's other open tabs show it too.
const CHANNEL = 'raku-koans:progress';

type Message = { id: string; entry: KoanProgress } | { reset: true };

export class Progress {
  map = $state<ProgressMap>({});
  loaded = $state(false);
  private channel = typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(CHANNEL);

  constructor() {
    this.channel?.addEventListener('message', ({ data }: MessageEvent<Message>) => {
      if ('reset' in data) this.map = {};
      else this.accept(data.id, data.entry);
    });
  }

  async init() {
    try {
      const stored = (await get<ProgressMap>(STORAGE_KEY)) ?? {};
      // Keep anything another tab announced while this one was loading.
      this.map = { ...stored, ...$state.snapshot(this.map) };
      // Ask the browser not to evict our data under storage pressure.
      void navigator.storage?.persist?.();
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
      await set(STORAGE_KEY, {});
    } catch {
      /* storage unavailable */
    }
    this.channel?.postMessage({ reset: true } satisfies Message);
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
      await update<ProgressMap>(STORAGE_KEY, stored => {
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

export const progress = new Progress();
