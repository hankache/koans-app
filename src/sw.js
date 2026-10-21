// The service worker: keeps the site, and each language's interpreter once it's been opened, on
// this device. A language opened once then works offline, and nothing is downloaded twice.
//
// The build writes it to dist/sw.js, filling in OFFLINE (see offline() in vite.config.ts):
//   core      the files every page needs, saved when the service worker installs
//   assets    every file of the app's code; the rest are saved when first used
//   shell     a hash of the build, naming the cache of the site's own files
//   runtimes  { <folder of public/runtime>: { hash, files, bytes } }: each interpreter's version,
//             its files, and what the browser downloads to start it
// The app registers it in production only (src/lib/offline.ts).
const OFFLINE = __OFFLINE__;

const scope = new URL(self.registration.scope);
const SHELL = `shell-${OFFLINE.shell}`;
const FONTS = 'fonts';
const runtimeCache = dir => `runtime-${dir}-${OFFLINE.runtimes[dir].hash}`;
const current = new Set([SHELL, FONTS, ...Object.keys(OFFLINE.runtimes).map(runtimeCache)]);
// The page itself, whatever the address: the routes are all after the #.
const PAGE = new URL('index.html', scope).href;
const at = path => new URL(path, scope).href;

/** The interpreter folder a URL is in (python for runtime/python/…), if any. */
function runtimeOf(url) {
  return url.pathname.slice(scope.pathname.length).match(/^runtime\/([^/]+)\//)?.[1];
}

/** The cache a request's response belongs in, or null to leave it to the network. */
function cacheFor(url) {
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') return FONTS;
  if (!url.href.startsWith(scope.href)) return null;
  const dir = runtimeOf(url);
  if (dir) return OFFLINE.runtimes[dir] ? runtimeCache(dir) : null;
  return SHELL;
}

/** Fetches url into a cache, unless it's there already. Best effort: a failure leaves it out. */
async function keep(cache, url) {
  if (await cache.match(url)) return;
  const response = await fetch(url, { cache: 'no-cache' }).catch(() => null);
  if (response?.ok) await cache.put(url, response);
}

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      // no-cache: the browser's HTTP cache may hold an index.html older than this build.
      const shell = await caches.open(SHELL);
      await shell.addAll(OFFLINE.core.map(path => new Request(at(path), { cache: 'no-cache' })));
      await carryOver(shell);
      await self.skipWaiting();
    })(),
  );
});

/**
 * After an update, keeps what the learner had: each code file kept before (its new version if it
 * changed), and the new version of each interpreter they had opened. Done before the old caches
 * go, so an unchanged file is copied rather than downloaded.
 */
async function carryOver(shell) {
  const names = await caches.keys();
  // A code file's name without its hash: content-python-B9DCfNXl.js → content-python.js
  const stem = url => url.replace(/-[\w-]{8}(\.\w+)$/, '$1');
  const had = new Set();
  for (const name of names.filter(n => n.startsWith('shell-') && n !== SHELL)) {
    for (const request of await (await caches.open(name)).keys()) had.add(stem(request.url));
  }
  const code = OFFLINE.assets.map(at).filter(url => had.has(stem(url)));
  await Promise.all(
    code.map(async url => {
      const old = await caches.match(url);
      if (old) await shell.put(url, old);
      else await keep(shell, url);
    }),
  );

  for (const [dir, { files }] of Object.entries(OFFLINE.runtimes)) {
    const opened = names.some(n => n.startsWith(`runtime-${dir}-`) && n !== runtimeCache(dir));
    if (!opened) continue;
    const cache = await caches.open(runtimeCache(dir));
    await Promise.all(files.map(f => keep(cache, at(`runtime/${dir}/${f}`))));
  }
}

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      for (const name of await caches.keys()) if (!current.has(name)) await caches.delete(name);
      // Take over the open pages, so a first visit's interpreter is saved too.
      await self.clients.claim();
    })(),
  );
});

// What a first visit loaded before the service worker took over (src/lib/offline.ts).
self.addEventListener('message', event => {
  if (event.data?.type !== 'keep') return;
  event.waitUntil(
    Promise.all(
      event.data.urls.map(async href => {
        const name = cacheFor(new URL(href));
        if (name) await keep(await caches.open(name), href);
      }),
    ),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    const address = url.origin + url.pathname;
    if (address === scope.href || address === PAGE) event.respondWith(page(event));
    return;
  }
  const name = cacheFor(url);
  if (name === FONTS) event.respondWith(font(event));
  else if (name) event.respondWith(saved(event, name));
});

/**
 * The page: from the network, so a new version shows at once, and saved for when there is no
 * network, or it takes longer than 4 seconds to answer.
 */
async function page(event) {
  const shell = await caches.open(SHELL);
  const network = fetch(event.request).then(response => {
    if (response.ok) event.waitUntil(shell.put(PAGE, response.clone()));
    return response;
  });
  const slow = new Promise(resolve => setTimeout(resolve, 4000));
  try {
    const response = await Promise.race([network, slow]);
    if (response) return response;
  } catch {
    // Offline: the saved page, below.
  }
  return (await shell.match(PAGE)) ?? network;
}

/**
 * Saved first, then the network. A file's name never changes its content: the app's code has a
 * hash in its name, and each interpreter's cache its version.
 */
async function saved(event, name) {
  const { request } = event;
  const cache = await caches.open(name);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  // 200 only: not a part of a file (206), nor a redirect.
  if (response.status === 200 && response.type === 'basic') {
    event.waitUntil(cache.put(request, response.clone()));
    const dir = runtimeOf(new URL(request.url));
    if (dir) event.waitUntil(report(dir, request.url, response.clone()));
  }
  return response;
}

/**
 * Tells the open pages how far an interpreter file's download has got, about ten times a second:
 * { type: 'download', dir, file, received, total }, where total is what the whole interpreter
 * downloads to start. The koan page adds up its files for its loading bar (src/lib/offline.ts).
 */
async function report(dir, url, response) {
  const file = url.slice(at(`runtime/${dir}/`).length);
  const reader = response.body.getReader();
  let received = 0;
  let last = 0;
  const post = async () => {
    last = Date.now();
    const message = { type: 'download', dir, file, received, total: OFFLINE.runtimes[dir].bytes };
    for (const client of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) client.postMessage(message);
  };
  for (;;) {
    const { done, value } = await reader.read().catch(() => ({ done: true }));
    if (done) break;
    received += value.byteLength;
    if (Date.now() - last > 100) void post();
  }
  await post();
}

/** Google's fonts: the saved copy at once, updated in the background for next time. */
async function font(event) {
  const cache = await caches.open(FONTS);
  const hit = await cache.match(event.request);
  const update = fetch(event.request).then(response => {
    if (response.ok || response.type === 'opaque') event.waitUntil(cache.put(event.request, response.clone()));
    return response;
  });
  if (!hit) return update;
  event.waitUntil(update.catch(() => {}));
  return hit;
}
