// Working offline: the service worker (src/sw.js) keeps the site, and each interpreter once
// opened, on this device. Registered in production builds only: on the dev server it would serve
// stale code.

let controlled: Promise<void> = Promise.resolve();

export function startOffline() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  const sw = navigator.serviceWorker;
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
