// Working offline: the service worker (src/sw.js) keeps the site, and each interpreter once
// opened, on this device. Registered in production builds only: on the dev server it would serve
// stale code.

let controlled: Promise<void> = Promise.resolve();

export function startOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  const sw = navigator.serviceWorker;
  sw.addEventListener('message', ({ data }) => {
    if (data?.type === 'download') downloaded(data);
  });
  sw.startMessages();
  sw.register(`${import.meta.env.BASE_URL}sw.js`).catch(e => console.error('No offline mode:', e));
  if (sw.controller) return;
  // A first visit: the service worker takes over once it has installed. It then saves what the
  // page loaded before, and the interpreter waits for it (a few seconds at most), so its files
  // go through the service worker and are saved too.
  controlled = new Promise(resolve => {
    sw.addEventListener(
      'controllerchange',
      () => {
        const urls = performance.getEntriesByType('resource').map(e => e.name);
        sw.controller?.postMessage({ type: 'keep', urls });
        resolve();
      },
      { once: true },
    );
    setTimeout(resolve, 3000);
  });
}

/** Resolves once the service worker controls the page, or when it's no use waiting for it. */
export function whenControlled(): Promise<void> {
  return controlled;
}

// How far each interpreter has downloaded, from the service worker's reports: { dir: { file: bytes } }.
// Only while the service worker controls the page: otherwise nobody reports, and the page just
// says the interpreter is on its way.
const received = new Map<string, Map<string, number>>();
const totals = new Map<string, number>();
const watchers = new Set<{ dir: string; on: (download: Download) => void }>();

export interface Download {
  /** Bytes received so far, of `total`. */
  received: number;
  total: number;
}

function downloaded(data: { dir: string; file: string; received: number; total: number }) {
  const files = received.get(data.dir) ?? new Map<string, number>();
  received.set(data.dir, files);
  // Reports can arrive out of order: keep the furthest.
  files.set(data.file, Math.max(files.get(data.file) ?? 0, data.received));
  totals.set(data.dir, data.total);
  for (const w of watchers) if (w.dir === data.dir) w.on(downloadOf(data.dir)!);
}

function downloadOf(dir: string): Download | null {
  const files = received.get(dir);
  if (!files) return null;
  const sum = [...files.values()].reduce((a, b) => a + b, 0);
  return { received: sum, total: totals.get(dir)! };
}

/**
 * Calls `on` with an interpreter's download progress, now if it has started and whenever it moves
 * on. `dir` is its folder in public/runtime. Returns a function to stop.
 */
export function watchDownload(dir: string, on: (download: Download) => void): () => void {
  const watcher = { dir, on };
  watchers.add(watcher);
  const now = downloadOf(dir);
  if (now) on(now);
  return () => watchers.delete(watcher);
}
