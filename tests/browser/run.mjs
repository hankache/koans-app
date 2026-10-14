// Checks the built site in real browsers: the home page (its koan to try, where to continue, and its
// phone layout), what each page downloads, every language's koan flow, old addresses, progress
// across tabs, and export/import.
//
//   npm run test:browser                      Chrome and Firefox (builds the site first)
//   npm run test:browser -- --browser chrome  one of them
//
// It drives the browsers installed on this machine. Chrome is found where it's usually installed;
// set CHROME_PATH or FIREFOX_PATH to use another one. A missing browser is skipped with a warning,
// unless it was asked for by name.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeSystemExecutablePath } from '@puppeteer/browsers';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';
import { readKoans } from '../../scripts/lib/koans.mjs';
import { languages as toolLanguages } from '../../scripts/lib/languages.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const koanIds = JSON.parse(readFileSync(join(root, 'src/generated/summary.json'), 'utf8'));

/**
 * Each language's koan flow, on its first koan (taken, with its solution, from its files): `error`
 * must stop with an error on line 2 matching `says`, and `loop` must never end.
 */
const LANGUAGES = [
  { id: 'raku', error: "is 1, 1, 'fine';\ndie 'boom';", says: /boom/, loop: 'loop { }' },
  { id: 'python', error: "assert True, 'fine'\nprint(nope)", says: /NameError/, loop: 'while True:\n    pass' },
  { id: 'javascript', error: "assert.ok(true, 'fine');\nnope();", says: /ReferenceError/, loop: 'while (true) {}' },
  { id: 'ruby', error: "assert true, 'fine'\nnope", says: /NameError/, loop: 'loop { }' },
  { id: 'lua', error: "assert(true, 'fine')\nnope()", says: /attempt to call a nil value/, loop: 'while true do end' },
  { id: 'sql', error: "SELECT 1; -- expect: 1\nINSERT INTO nowhere VALUES (1);", says: /no such table/, loop: 'WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n) SELECT count(*) FROM n;' },
  { id: 'typescript', error: "assert.ok(true, 'fine');\nconst n: number = 'text';", says: /TS2322/, loop: 'while (true) {}' },
];

// --- Which browsers

function firefoxPath() {
  const candidates = [
    process.env.FIREFOX_PATH,
    '/usr/lib/firefox/firefox',
    '/usr/bin/firefox',
    '/Applications/Firefox.app/Contents/MacOS/firefox',
    'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
  ];
  return candidates.find(p => p && existsSync(p));
}

function chromePath() {
  if (process.env.CHROME_PATH) return existsSync(process.env.CHROME_PATH) ? process.env.CHROME_PATH : undefined;
  try {
    const path = computeSystemExecutablePath({ browser: 'chrome', channel: 'stable' });
    return existsSync(path) ? path : undefined;
  } catch {
    return undefined;
  }
}

const args = process.argv.slice(2);
const asked = args.includes('--browser') ? args[args.indexOf('--browser') + 1] : null;
const browsers = [
  { name: 'chrome', path: chromePath(), launch: path => puppeteer.launch({ executablePath: path, headless: true, args: ['--no-sandbox'] }) },
  { name: 'firefox', path: firefoxPath(), launch: path => puppeteer.launch({ browser: 'firefox', executablePath: path, headless: true }) },
].filter(b => !asked || b.name === asked);
if (!browsers.length) {
  console.error(`✗ unknown browser "${asked}": chrome or firefox`);
  process.exit(1);
}

// --- Reporting

let failures = 0;
const check = (name, ok, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${name}${!ok && detail ? `\n    ${detail}` : ''}`);
};
const text = (page, selector) => page.$eval(selector, e => e.textContent.replace(/\s+/g, ' ').trim());

/** Records problems (console errors, failed requests) and which language files a page loads. */
function watch(page) {
  const seen = { problems: [], loaded: [] };
  page.on('console', m => m.type() === 'error' && seen.problems.push(`console: ${m.text()}`));
  page.on('pageerror', e => seen.problems.push(`page: ${e.message}`));
  page.on('requestfailed', r => seen.problems.push(`failed: ${r.url()}`));
  page.on('response', r => {
    if (r.status() >= 400) seen.problems.push(`HTTP ${r.status()}: ${r.url()}`);
    if (/assets\/content-[^/]*\.js$|runtime\/\w+\/worker\.js$/.test(r.url())) seen.loaded.push(r.url());
  });
  return seen;
}

async function setCode(page, code) {
  await page.click('.cm-content');
  await page.keyboard.down('Control');
  await page.keyboard.press('a');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(code);
}

/** The result panel's text, once it matches `until` (or after a minute, whatever it says). */
async function panel(page, until) {
  await page
    .waitForFunction(re => new RegExp(re).test(document.querySelector('aside .panel')?.textContent ?? ''), { timeout: 60000 }, until.source)
    .catch(() => {});
  return text(page, 'aside .panel');
}

async function run(page, code, until) {
  await setCode(page, code);
  await page.click('button.primary');
  return panel(page, until);
}

// --- The checks

async function checkSite(browser, base) {
  const page = await browser.newPage();
  const seen = watch(page);
  // Keeps what the page exports: browsers differ in how a script can collect downloads.
  await page.evaluateOnNewDocument(() => {
    const make = URL.createObjectURL;
    URL.createObjectURL = blob => ((window.__exported = blob), make(blob));
  });

  // The home page, and loading each language only when it's opened
  await page.goto(`${base}#/`, { waitUntil: 'networkidle0' });
  const names = await page.$$eval('.tile .name', ns => ns.map(n => n.textContent));
  check('the home page lists every language', names.length === LANGUAGES.length, names.join(', '));
  check('the home page loads no language', seen.loaded.length === 0, seen.loaded.join(' '));
  check('a first visit shows no "continue"', !(await page.$('.resume')));

  // Its koan to try: a wrong answer, then the right one (JavaScript's, shown first).
  const choose = async answer => {
    const buttons = await page.$$('.choice');
    for (const b of buttons) if ((await b.evaluate(e => e.textContent)) === answer) await b.click();
    return text(page, '.feedback');
  };
  check('the koan to try says when an answer is wrong', /Not quite/.test(await choose('7')));
  check('and when it is right', /Enlightenment/.test(await choose("'52'")) && (await text(page, '.code')).includes("'52'"));

  await page.click('a.tile[href="#/python/"]');
  await page.waitForSelector('.sections');
  await page.waitForNetworkIdle({ idleTime: 500 });
  check('picking a language opens its path', page.url().endsWith('#/python/'));
  check("and loads only that language's files", seen.loaded.length === 2 && seen.loaded.every(u => !/runtime\/(?!python)/.test(u)), seen.loaded.join(' '));

  // Every language's koan flow
  for (const lang of LANGUAGES) {
    const first = readKoans(toolLanguages.find(l => l.id === lang.id))[0].koans[0];
    const blankLine = first.code.split('\n').findIndex(l => l.includes('___')) + 1;
    await page.goto(`${base}#/${lang.id}/koan/${first.id}`);
    await page.waitForSelector('.cm-content');
    await page.click('button.primary');
    check(`${lang.id}: the unsolved koan points at its first blank`, new RegExp(`Meditate on line ${blankLine}\\b`).test(await panel(page, /Meditate/)));

    const solution = first.solution.trimEnd();
    await setCode(page, solution);
    await page.keyboard.down('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.up('Control');
    check(`${lang.id}: Ctrl+Enter runs the solution: enlightenment`, /Enlightenment/.test(await panel(page, /Enlightenment/)));

    const error = await run(page, lang.error, /line 2/);
    check(`${lang.id}: an error shows its message and line`, /line 2/.test(error) && lang.says.test(error), error.slice(0, 100));
    check(`${lang.id}: an infinite loop is stopped`, /too long/.test(await run(page, lang.loop, /too long/)));
    check(`${lang.id}: and the next run works`, /Enlightenment/.test(await run(page, solution, /Enlightenment/)));

    await page.click('.crumbs a');
    await page.waitForSelector('.sections');
    check(`${lang.id}: the crumbs lead back to its path`, page.url().endsWith(`#/${lang.id}/`));
  }

  // JavaScript's line numbers come from each browser's stack traces. Another koan than the solved
  // one: these runs fail on purpose, and the latest run decides a koan's status.
  for (const [what, code, want] of [
    ['a failure after await', "await null;\nassert.equal(await Promise.resolve(1), 2, 'later');", /line 2/],
    ['a failure inside a function', "function check() {\nassert.equal(1, 2, 'inside');\n}\ncheck();", /line 2/],
    ['a syntax error', 'assert.ok(true);\nlet x = = 1;', /line 2[\s\S]*SyntaxError/],
  ]) {
    await page.goto(`${base}#/javascript/koan/awakening/equality`);
    await page.waitForSelector('.cm-content');
    const out = await run(page, code, /line \d/);
    check(`javascript: ${what} points at its line`, want.test(out), out.slice(0, 100));
  }

  // Addresses
  await page.goto(`${base}#/koan/numbers/division`);
  await page.waitForFunction(() => location.hash === '#/raku/koan/numbers/division', { timeout: 10000 }).catch(() => {});
  await page.waitForSelector('h1');
  check('an old Raku Koans address opens the same Raku koan', (await text(page, 'h1')).startsWith('Division'));
  await page.goto(`${base}#/no-such-language/`);
  await page.waitForSelector('.tiles');
  check('an unknown language leads home', true);

  // Progress on the home page, then export
  await page.goto(`${base}#/`);
  await page.waitForSelector('.tile .progress');
  const tiles = await page.$$eval('.tile', ts => ts.map(t => t.textContent.replace(/\s+/g, ' ').trim()));
  check("the home page shows each language's progress", LANGUAGES.every((l, i) => tiles[i]?.includes(`1/${koanIds[l.id].length}`)), tiles.join(' | '));
  const resume = await page.$eval('.resume', r => ({ href: r.getAttribute('href'), text: r.textContent.replace(/\s+/g, ' ') })).catch(() => null);
  // The last koan run was JavaScript's second, by the line-number checks above, which left it unsolved.
  check('and where to continue: the unsolved koan worked on last',
    resume?.href === `#/javascript/koan/${koanIds.javascript[1].id}` && resume.text.includes(koanIds.javascript[1].title), JSON.stringify(resume));

  await page.click('.keep-toggle');

  await page.click('.buttons button:first-child');
  await page.waitForSelector('.note');
  const note = await text(page, '.note');
  const exported = await page.evaluate(() => window.__exported?.text());
  const file = exported && JSON.parse(exported);
  check('export saves a dated file with every language', /koans-app-progress-\d{4}-\d\d-\d\d\.json/.test(note) &&
    LANGUAGES.every(l => Object.keys(file?.languages?.[l.id] ?? {}).length > 0), note);
  check('no console errors, failed requests or HTTP errors', seen.problems.length === 0, seen.problems.join(' | '));
  await page.close();
  return exported;
}

async function checkImport(browser, base, exported, dir) {
  // A fresh profile: as if on another browser.
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.goto(`${base}#/`);
  await page.waitForSelector('.keep-toggle');
  await page.click('.keep-toggle');
  const path = join(dir, 'progress.json');
  writeFileSync(path, exported);
  await (await page.$('input[type=file]')).uploadFile(path);
  await page.waitForSelector('.note');
  await page.waitForSelector('.tile .progress');
  const after = await page.$$eval('.tile', ts => ts.map(t => t.textContent.replace(/\s+/g, ' ').trim()));
  check('import in a fresh browser brings the progress back', after.length === LANGUAGES.length && after.every(t => /\b1\/\d+/.test(t)), await text(page, '.note'));

  await (await page.$('input[type=file]')).uploadFile(path);
  await page.waitForFunction(() => /Nothing new/.test(document.querySelector('.note')?.textContent ?? ''), { timeout: 5000 }).catch(() => {});
  check('importing it again changes nothing', /Nothing new/.test(await text(page, '.note')));

  await page.goto(`${base}#/python/koan/${koanIds.python[0].id}`);
  await page.waitForSelector('.cm-content');
  check('and brings the saved code', (await text(page, '.cm-content')).includes('assert True'));

  const bad = join(dir, 'bad.json');
  writeFileSync(bad, '{"hello": 1}');
  await page.goto(`${base}#/`);
  await page.waitForSelector('.keep-toggle');
  await page.click('.keep-toggle');
  await (await page.$('input[type=file]')).uploadFile(bad);
  await page.waitForSelector('.note.error');
  check('a file that is not a progress file is refused', /not a koans.app progress file/.test(await text(page, '.note')));

  // The home page on a phone-sized screen, with progress to continue from.
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto(`${base}#/javascript/`);
  await page.goto(`${base}#/`);
  await page.waitForSelector('.resume');
  const phone = await page.evaluate(() => ({
    sideways: document.documentElement.scrollWidth - window.innerWidth,
    columns: getComputedStyle(document.querySelector('.tiles')).gridTemplateColumns.split(' ').length,
    resumeFirst: document.querySelector('.resume').getBoundingClientRect().top < document.querySelector('.hero').getBoundingClientRect().top,
  }));
  check('on a phone: no sideways scrolling', phone.sideways <= 0, `${phone.sideways}px too wide`);
  check('on a phone: two columns of languages', phone.columns === 2, `${phone.columns} columns`);
  check('on a phone: "continue" comes first', phone.resumeFirst);
  await context.close();
}

async function checkTabs(browser, base) {
  const context = await browser.createBrowserContext();
  const [a, b] = [await context.newPage(), await context.newPage()];
  for (const p of [a, b]) {
    await p.goto(`${base}#/javascript/`);
    await p.waitForSelector('header .meter');
  }
  const solve = async (page, koan) => {
    // Background tabs are throttled: bring each to the front before driving it.
    await page.bringToFront();
    await page.goto(`${base}#/javascript/koan/awakening/${koan}`);
    await page.waitForSelector('.cm-content');
    const file = koan === 'assertions' ? '01-assertions' : '02-equality';
    await run(page, readFileSync(join(root, `languages/javascript/koans/01-awakening/${file}.solution.js`), 'utf8').trimEnd(), /Enlightenment/);
  };
  await solve(a, 'assertions');
  await b.bringToFront();
  const updated = await b
    .waitForFunction(() => /1 done/.test(document.querySelector('header .meter')?.textContent ?? ''), { timeout: 10000 })
    .then(() => true, () => false);
  check("another open tab shows a pass without reloading", updated);
  // b was opened before a's pass; saving its own must not erase it.
  await solve(b, 'equality');
  const c = await context.newPage();
  await c.goto(`${base}#/javascript/`);
  await c.waitForSelector('header .meter');
  check('tabs saving in turn keep both passes', /2 done/.test(await text(c, 'header .meter')));
  await context.close();
}

// --- Run

const server = await preview({ root, logLevel: 'silent', preview: { port: 0, strictPort: false, open: false } });
const base = server.resolvedUrls.local[0];
const dir = mkdtempSync(join(tmpdir(), 'koans-browser-'));
try {
  for (const { name, path, launch } of browsers) {
    if (!path) {
      console.log(`\n⚠ ${name} not found${name === 'firefox' ? ' (set FIREFOX_PATH)' : ' (set CHROME_PATH)'}: skipped`);
      if (asked) failures++;
      continue;
    }
    let browser;
    try {
      browser = await launch(path);
    } catch (e) {
      console.log(`\n✗ ${name} at ${path} did not start: ${e.message.split('\n')[0]}`);
      failures++;
      continue;
    }
    console.log(`\n${await browser.version()}`);
    try {
      const exported = await checkSite(browser, base);
      if (exported) await checkImport(browser, base, exported, dir);
      await checkTabs(browser, base);
    } finally {
      await browser.close();
    }
  }
} finally {
  await server.close();
  rmSync(dir, { recursive: true, force: true });
}

console.log(failures ? `\n${failures} check(s) failed.` : '\nAll browser checks passed.');
process.exit(failures ? 1 : 0);
