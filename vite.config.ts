/// <reference types="vitest/config" />
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import { configDefaults } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { languages } from './scripts/lib/languages.mjs';
import { pagePaths, pages } from './scripts/lib/pages.ts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The commit a production build comes from, shown in the footer. null (shown as
 * "Development build") for the dev server, or when there is no git repository or there are
 * uncommitted changes: then no commit matches the code.
 */
function buildInfo(command: string) {
  if (command !== 'build') return null;
  try {
    const git = (args: string) => execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (git('status --porcelain')) return null;
    const commit = git('rev-parse HEAD');
    const date = new Date(git('log -1 --format=%cI'));
    return {
      commit,
      short: commit.slice(0, 7),
      // "1 Oct 2026", spelled out by hand: date locales vary between Node versions ("Sept").
      date: `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`,
    };
  } catch {
    return null;
  }
}

/** Every file under dir, as paths relative to it. */
function filesIn(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(e => e.isFile())
    .map(e => `${e.parentPath}/${e.name}`.slice(dir.length + 1))
    .sort();
}

function hash(dir: string, files: string[]): string {
  const h = createHash('sha256');
  for (const f of files) h.update(`${f}\0`).update(readFileSync(`${dir}/${f}`));
  return h.digest('hex').slice(0, 12);
}

/**
 * What the browser downloads to start a language's interpreter, in bytes: its folder, less what
 * it loads only on demand (the language's `onDemand`), source maps and licences.
 */
function startSize(dir: string, files: string[]): number {
  const onDemand = languages.find(l => l.id === dir)?.onDemand ?? [];
  return files
    .filter(f => !/\.map$|(^|\/)(LICENSE|NOTICE)[^/]*$|(^|\/)package\.json$/.test(f))
    .filter(f => !onDemand.some(d => (d.endsWith('/') ? f.startsWith(d) : f === d)))
    .reduce((sum, f) => sum + statSync(`public/runtime/${dir}/${f}`).size, 0);
}

/**
 * Writes the service worker (src/sw.js) into the build as sw.js, with what it needs to know: the
 * files every page needs, the app's code files, and for each language's interpreter a version (a
 * hash of its folder in public/runtime, worker included, so any change gets a new version) and
 * its download size (for the loading bar).
 */
function offline(): Plugin {
  return {
    name: 'koans-offline',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      // The page, the code it starts with (the entry and what it imports), its fonts, and the small public
      // files: icons, logo and animations. Not the interpreters, the long licence notices, or the
      // images for link previews.
      const core = new Set(['index.html']);
      const add = (name: string) => {
        const file = bundle[name];
        if (core.has(name) || !file) return;
        core.add(name);
        if (file.type === 'chunk') {
          file.imports.forEach(add);
          file.viteMetadata?.importedCss.forEach(add);
        }
      };
      for (const file of Object.values(bundle)) if (file.type === 'chunk' && file.isEntry) add(file.fileName);
      // The fonts' Latin files, which every page uses (src/fonts.css), but not Latin Extended's.
      for (const name of Object.keys(bundle)) if (/-latin-\w+-normal-[\w-]+\.woff2$/.test(name)) core.add(name);
      const publicFiles = filesIn('public').filter(f => !/^(runtime|social)\//.test(f) && f !== 'third-party-notices.txt');
      publicFiles.forEach(f => core.add(f));

      const assets = Object.keys(bundle).filter(f => f.startsWith('assets/')).sort();
      const runtimes = Object.fromEntries(
        readdirSync('public/runtime').map(dir => {
          const files = filesIn(`public/runtime/${dir}`);
          return [dir, { hash: hash(`public/runtime/${dir}`, files), files, bytes: startSize(dir, files) }];
        }),
      );
      const shell = createHash('sha256')
        .update(JSON.stringify(assets))
        .update(hash('public', publicFiles))
        .digest('hex')
        .slice(0, 12);

      const source = readFileSync('src/sw.js', 'utf8');
      if (!source.includes('__OFFLINE__')) this.error('src/sw.js has lost its __OFFLINE__ placeholder');
      const filled = source.replace('__OFFLINE__', JSON.stringify({ core: [...core], assets, shell, runtimes, pages: pagePaths() }));
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: filled });
    },
  };
}

export default defineConfig(({ command }) => ({
  // Relative links, so one build works at a domain's root or in a sub-folder
  // (e.g. user.github.io/koans-app/). Safe because the app is a single page:
  // koans only change the #… part of the address, so the page is always index.html.
  base: './',
  define: {
    __BUILD__: JSON.stringify(buildInfo(command)),
  },
  plugins: [svelte(), pages(), offline()],
  build: {
    rolldownOptions: {
      output: {
        // Each language's koans named after it (content-python-….js), so the service worker can
        // tell them apart across versions.
        chunkFileNames: chunk => {
          const lang = chunk.facadeModuleId?.match(/languages\/([^/]+)\/content\.ts$/)?.[1];
          return lang ? `assets/content-${lang}-[hash].js` : 'assets/[name]-[hash].js';
        },
      },
    },
  },
  // languages/_template is a starting point for new languages, not a language.
  test: { exclude: [...configDefaults.exclude, 'languages/_template/**'] },
}));
