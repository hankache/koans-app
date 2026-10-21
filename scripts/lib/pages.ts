// Pages for search engines and shared links. The app is one page whose routes are all after the #,
// which search engines don't read, so the build adds what they can:
//
//   index.html          the home page, with a title, description and preview tags for shared
//                       links, and the list of languages as plain HTML
//   <language>/         a page per language (python/, ruby/, …): the same app, with its own title,
//                       description and preview, and its path (groups and koans) as plain HTML.
//                       The app opens that language's path there (src/main.ts)
//   sitemap.xml, robots.txt
//
// The plain HTML is what search engines and link previews read; the app replaces it as it starts.
// Preview images are in public/social/, drawn by design/build-social-images.mjs.
//
// It imports nothing of the app's but src/site.ts, which imports nothing itself: the build config
// stays loadable by Node's own rules (Vite's coming default). The language packs, which import
// the app's modules, are loaded when the pages are made, by Node, which reads TypeScript.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import type { Plugin } from 'vite';
import type { LanguagePack, Manifest } from '../../src/lib/language.ts';
import { site } from '../../src/site.ts';
import { languages } from './languages.mjs';

/** The language packs (languages/<id>/pack.ts), in the order the build tools list them, the site's. */
function loadPacks(): Promise<LanguagePack[]> {
  return Promise.all(languages.map(async ({ id }) => (await import(pathToFileURL(`languages/${id}/pack.ts`).href)).default));
}

const escape = (text: string) =>
  text.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Text with `code` in backticks, as HTML. */
const withCode = (text: string) =>
  text.split(/(`[^`]+`)/).map(part => (part.startsWith('`') ? `<code>${escape(part.slice(1, -1))}</code>` : escape(part))).join('');

const manifestOf = (pack: LanguagePack): Manifest =>
  JSON.parse(readFileSync(`src/generated/${pack.id}.json`, 'utf8'));

const koanCount = (pack: LanguagePack) => manifestOf(pack).sections.reduce((n, s) => n + s.koans.length, 0);

const list = (items: string[]) => `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;

interface Head {
  title: string;
  description: string;
  /** The page's address, relative to the site's. */
  path: string;
  /** Its preview image, in public/social/. */
  image: string;
  imageAlt: string;
}

function head({ title, description, path, image, imageAlt }: Head): string {
  const url = site.url + path;
  const meta = (attr: string, name: string, content: string) => `<meta ${attr}="${name}" content="${escape(content)}" />`;
  return [
    `<title>${escape(title)}</title>`,
    meta('name', 'description', description),
    `<link rel="canonical" href="${url}" />`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', site.name),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', `${site.url}social/${image}`),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
  ].join('\n    ');
}

function homePage(html: string, packs: LanguagePack[]): string {
  const names = list(packs.map(p => p.name));
  const body = `<main class="prerendered">
      <h1>${escape(site.name)}</h1>
      <p>${escape(site.tagline)}, right in your browser: ${escape(names)}. Nothing to install, no account.</p>
      <ul>
        ${packs.map(p => `<li><a href="${p.id}/">${escape(p.name)} Koans</a>: ${escape(p.tagline)} (${koanCount(p)} koans)</li>`).join('\n        ')}
      </ul>
    </main>`;
  return fill(html, {
    head: head({
      title: `${site.name} · ${site.tagline}`,
      description: `${site.tagline}, right in your browser: ${names}. Nothing to install, no account.`,
      path: '',
      image: 'home.png',
      imageAlt: `${site.name}: the gateless gate`,
    }),
    body,
  });
}

function languagePage(html: string, pack: LanguagePack): string {
  const { sections } = manifestOf(pack);
  const count = koanCount(pack);
  const description = `${pack.tagline}. ${count} koans to solve in your browser, tested with ${pack.testedWith.name}. Nothing to install.`;
  const body = `<main class="prerendered">
      <p><a href="../">${escape(site.name)}</a></p>
      <h1>${escape(pack.name)} Koans</h1>
      <p>${withCode(pack.about)}</p>
      <p>${count} koans in ${sections.length} groups, tested with <a href="${pack.testedWith.url}">${escape(pack.testedWith.name)}</a>. Each is a small program whose tests fail: replace every <code>___</code> until they pass.</p>
      <p><a href="../#/${pack.id}/">Start the path</a></p>
      ${sections
        .map(s => `<h2>${escape(s.title)}</h2>
      <p>${withCode(s.blurb)}</p>
      <ol>${s.koans.map(k => `<li><a href="../#/${pack.id}/koan/${k.id}">${escape(k.title)}</a></li>`).join('')}</ol>`)
        .join('\n      ')}
    </main>`;
  const page = fill(html, {
    head: head({
      title: `${pack.name} Koans · ${site.name}`,
      description,
      path: `${pack.id}/`,
      image: `${pack.id}.png`,
      imageAlt: `${pack.name} Koans on ${site.name}`,
    }),
    body,
  });
  // One folder down: the page's own files are one level up.
  return page.replace(/(src|href)="\.\//g, '$1="../');
}

/** Puts the head's tags in place of the page's title and description, and the body in #app. */
function fill(html: string, { head, body }: { head: string; body: string }): string {
  const parts = [/<title>[^<]*<\/title>\s*/, /<meta name="description"[^>]*>\s*/, /<div id="app"><\/div>/];
  for (const p of parts) if (!p.test(html)) throw new Error(`index.html has changed: no ${p} to fill in (scripts/lib/pages.ts)`);
  return html
    .replace(parts[0], '')
    .replace(parts[1], `${head}\n    `)
    .replace(parts[2], `<div id="app">\n    ${body}\n    </div>`);
}

export function pages(): Plugin {
  return {
    name: 'koans-pages',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_, bundle) {
      const packs = await loadPacks();
      const index = bundle['index.html'];
      if (index?.type !== 'asset') return this.error('no index.html in the build');
      const html = String(index.source);
      index.source = homePage(html, packs);
      for (const pack of packs) this.emitFile({ type: 'asset', fileName: `${pack.id}/index.html`, source: languagePage(html, pack) });

      const urls = ['', ...packs.map(p => `${p.id}/`)].map(path => `  <url><loc>${site.url}${path}</loc></url>`);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
      });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n` });
    },
  };
}

/** The language pages' folders, for the service worker. */
export const pagePaths = () => languages.map(l => `${l.id}/`);
