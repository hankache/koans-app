// Progress as a file, to keep a copy or move it to another browser. Reading one never trusts it:
// only well-formed entries for known languages get through.
import type { KoanProgress, ProgressMap } from './progress.svelte';

export const FORMAT = 'koans.app/progress';

export interface ProgressFile {
  format: typeof FORMAT;
  version: 1;
  exportedAt: string;
  /** Each language's progress, by koan id. */
  languages: Record<string, ProgressMap>;
}

export function makeExport(languages: Record<string, ProgressMap>, now = new Date()): ProgressFile {
  return { format: FORMAT, version: 1, exportedAt: now.toISOString(), languages };
}

/** "koans-app-progress-2026-10-14.json" */
export const exportName = (now = new Date()) => `koans-app-progress-${now.toISOString().slice(0, 10)}.json`;

export interface Imported {
  languages: Record<string, ProgressMap>;
  /** Entries left out because they weren't well formed. */
  skipped: number;
  /** Languages in the file that this site doesn't have. */
  unknown: string[];
}

const isDate = (v: unknown) => typeof v === 'string' && !Number.isNaN(Date.parse(v));

function isEntry(v: unknown): v is KoanProgress {
  if (typeof v !== 'object' || v === null) return false;
  const e = v as Record<string, unknown>;
  return (
    (e.status === 'attempted' || e.status === 'passed') &&
    typeof e.code === 'string' &&
    Number.isInteger(e.attempts) && (e.attempts as number) >= 0 &&
    (e.passedAt === null || isDate(e.passedAt)) &&
    isDate(e.updatedAt)
  );
}

/** Reads an exported file. Throws an Error with a message for people if it isn't one. */
export function readImport(text: string, known: string[]): Imported {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('That file is not a koans.app progress file (it is not JSON).');
  }
  const file = data as Partial<ProgressFile> | null;
  if (file?.format !== FORMAT || typeof file.languages !== 'object' || file.languages === null) {
    throw new Error('That file is not a koans.app progress file.');
  }
  if (file.version !== 1) throw new Error('That progress file comes from a newer version of the site.');

  const result: Imported = { languages: {}, skipped: 0, unknown: [] };
  for (const [lang, map] of Object.entries(file.languages)) {
    if (!known.includes(lang)) {
      result.unknown.push(lang);
      continue;
    }
    if (typeof map !== 'object' || map === null) continue;
    const entries: ProgressMap = {};
    for (const [id, entry] of Object.entries(map)) {
      if (isEntry(entry)) {
        const { status, code, attempts, passedAt, updatedAt } = entry;
        entries[id] = { status, code, attempts, passedAt, updatedAt };
      } else {
        result.skipped++;
      }
    }
    result.languages[lang] = entries;
  }
  return result;
}
