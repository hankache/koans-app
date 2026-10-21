// Draws the images shown with links to the site (1200 × 630, for Open Graph and X/Twitter cards):
// public/social/home.png for the home page and public/social/<id>.png for each language's page
// (scripts/lib/pages.ts). Rendered in the installed Chrome, with the site's fonts and dark theme
// (after npm install, which brings the fonts).
//
//   node design/build-social-images.mjs
//
// Run it again after changing a language's name, tagline, test framework, colours or emblem, or
// adding one. (No koan counts: they'd go out of date with every new koan. The pages give them.)
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { computeSystemExecutablePath } from '@puppeteer/browsers';
import puppeteer from 'puppeteer-core';

process.chdir(new URL('..', import.meta.url).pathname);

// Each language's pack.ts (Node reads TypeScript that only needs its types removed).
const ids = readdirSync('languages', { withFileTypes: true })
  .filter(e => e.isDirectory() && !e.name.startsWith('_'))
  .map(e => e.name);
const packs = await Promise.all(ids.map(async id => (await import(`../languages/${id}/pack.ts`)).default));

// The site's dark theme (src/app.css).
const ink = '#efe9f5';
const soft = '#b3a9c0';
const amber = '#f5cc4a';
const bg = '#15121b';

// The gateless gate (GateMark.svelte), and a language's emblem: the gate faint behind its symbol
// (Emblem.svelte).
const gateMark = size => `<svg width="${size}" height="${size}" viewBox="0 0 64 64">
  <g fill="${ink}"><path d="M4 10.5 C18 15 46 15 60 10.5 L58 17.5 C45 21 19 21 6 17.5 Z"/><rect x="30" y="19" width="4" height="7"/>
  <rect x="9" y="25" width="46" height="4"/><path d="M15 19.5 H21 L22 58 H14 Z"/><path d="M43 19.5 H49 L50 58 H42 Z"/></g>
  <path d="M26.5 38.5 A5.5 5.5 0 1 1 34.75 43.26 Q32 44.8 32 47.5 V48.3" fill="none" stroke="${amber}" stroke-width="3.4" stroke-linecap="round"/>
  <circle cx="32" cy="53.3" r="2.1" fill="${amber}"/></svg>`;
const emblem = (pack, size) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64" style="color:${pack.look.accent.dark}">
  <mask id="m-${pack.id}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
    <g transform="translate(32 44.5) scale(0.9) translate(-32 -44.5)">${pack.look.emblem.replaceAll('{F}', 'white').replaceAll('{C}', 'black')}</g>
  </mask>
  <g fill="currentColor" opacity="0.42"><path d="M3 9 C18 14 46 14 61 9 L59 16.5 C45 20.5 19 20.5 5 16.5 Z"/><rect x="30" y="18" width="4" height="6"/>
  <rect x="6" y="23.5" width="52" height="4"/><path d="M10.5 18 H16.5 L17.5 59 H9.5 Z"/><path d="M47.5 18 H53.5 L54.5 59 H46.5 Z"/></g>
  <rect width="64" height="64" fill="currentColor" mask="url(#m-${pack.id})"/></svg>`;

// The site's own fonts (src/fonts.css), embedded: Latin is all the images need.
const font = (family, file) => {
  const data = readFileSync(`node_modules/@fontsource-variable/${file}`).toString('base64');
  return `@font-face { font-family: '${family}'; font-weight: 100 900; src: url(data:font/woff2;base64,${data}) format('woff2'); }`;
};
const fonts = [font('Fraunces', 'fraunces/files/fraunces-latin-opsz-normal.woff2'), font('Inter', 'inter/files/inter-latin-wght-normal.woff2')].join('\n');

const escape = text => text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

const page = (body, accent = amber) => `<!doctype html><html><head><meta charset="utf-8">
<style>
  ${fonts}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: ${bg}; color: ${ink}; font-family: Inter, sans-serif; overflow: hidden;
    display: flex; flex-direction: column; justify-content: space-between; padding: 64px 80px; border-top: 10px solid ${accent}; }
  .main { display: flex; align-items: center; gap: 64px; flex: 1; }
  h1 { font-family: Fraunces, serif; font-weight: 700; font-size: 104px; line-height: 1; letter-spacing: -0.01em; }
  .tagline { font-size: 36px; line-height: 1.35; color: ${soft}; margin-top: 24px; max-width: 760px; }
  .foot { display: flex; align-items: center; justify-content: space-between; font-size: 28px; color: ${soft}; }
  .brand { display: flex; align-items: center; gap: 16px; font-family: Fraunces, serif; font-weight: 700; font-size: 40px; color: ${ink}; }
  .row { display: flex; gap: 22px; margin-top: 44px; }
</style></head><body>${body}</body></html>`;

const pages = [
  {
    file: 'home.png',
    html: page(`<div class="main">${gateMark(260)}<div>
      <h1>koans.app</h1>
      <p class="tagline">Learn a programming language by fixing failing tests, right in your browser.</p>
      <div class="row">${packs.map(p => emblem(p, 64)).join('')}</div></div></div>`),
  },
  ...packs.map(pack => ({
    file: `${pack.id}.png`,
    html: page(
      `<div class="main">${emblem(pack, 300)}<div>
        <h1>${escape(pack.name)} Koans</h1>
        <p class="tagline">${escape(pack.tagline)}</p></div></div>
      <div class="foot"><span class="brand">${gateMark(52)} koans.app</span>
        <span>Tested with ${escape(pack.testedWith.name)} · in your browser</span></div>`,
      pack.look.accent.dark,
    ),
  })),
];

mkdirSync('public/social', { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? computeSystemExecutablePath({ browser: 'chrome', channel: 'stable' }),
  headless: true,
});
try {
  const tab = await browser.newPage();
  tab.on('requestfailed', r => console.error(`✗ ${r.url()}: ${r.failure()?.errorText}`));
  await tab.setViewport({ width: 1200, height: 630 });
  for (const { file, html } of pages) {
    await tab.setContent(html, { waitUntil: 'load' });
    // The fonts must be in before the picture: stop if they aren't.
    const loaded = await tab.evaluate(async () => {
      await document.fonts.ready;
      // With text: the fonts cover Latin only.
      return ['700 10px Fraunces', '400 10px Inter'].every(f => document.fonts.check(f, 'Koans'));
    });
    if (!loaded) throw new Error(`the fonts did not load for ${file}`);
    await tab.screenshot({ path: `public/social/${file}`, type: 'png' });
  }
} finally {
  await browser.close();
}
console.log(`✓ public/social/: ${pages.map(p => p.file).join(', ')}`);
