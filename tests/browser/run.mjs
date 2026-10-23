// Checks the built site in real browsers: the home page (its koan to try, where to continue, and its
// phone layout), what each page downloads, every language's koan flow, old addresses, progress
// across tabs, export/import, working offline, the message while an interpreter downloads, the
// pages for search engines, accessibility (axe, in both themes, on a desktop and a phone),
// sharing a koan with your code in its link, and what koan code can't reach.
//
//   npm run test:browser                      Chrome and Firefox (builds the site first)
//   npm run test:browser -- --browser chrome  one of them
//
// It drives the browsers installed on this machine. Chrome is found where it's usually installed;
// set CHROME_PATH or FIREFOX_PATH to use another one. A missing browser is skipped with a warning,
// unless it was asked for by name.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
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
  { id: 'javascript', error: "expect(true, 'fine').toBe(true);\nnope();", says: /ReferenceError/, loop: 'while (true) {}' },
  { id: 'lua', error: "assert(true, 'fine')\nnope()", says: /attempt to call a nil value/, loop: 'while true do end' },
  { id: 'php', error: "<?php\nnope();", says: /undefined function nope/, loop: '<?php\nwhile (true) {}' },
  { id: 'python', error: "assert True, 'fine'\nprint(nope)", says: /NameError/, loop: 'while True:\n    pass' },
  { id: 'r', error: 'x <- 1\nnope()', says: /could not find function/, loop: 'repeat {}' },
  { id: 'raku', error: "is 1, 1, 'fine';\ndie 'boom';", says: /boom/, loop: 'loop { }' },
  { id: 'ruby', error: "expect(true).to be(true), 'fine'\nnope", says: /NameError/, loop: 'loop { }' },
  { id: 'sql', error: "SELECT 1; -- expect: 1\nINSERT INTO nowhere VALUES (1);", says: /no such table/, loop: 'WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n) SELECT count(*) FROM n;' },
  { id: 'typescript', error: "expect(true, 'fine').toBe(true);\nconst n: number = 'text';", says: /TS2322/, loop: 'while (true) {}' },
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

/** Records problems (console errors, failed requests), which language files a page loads, and every request. */
function watch(page) {
  const seen = { problems: [], loaded: [], requests: [] };
  page.on('request', r => seen.requests.push(r.url()));
  page.on('console', m => m.type() === 'error' && seen.problems.push(`console: ${m.text()}`));
  page.on('pageerror', e => seen.problems.push(`page: ${e.message}`));
  // php-wasm points the optional libxml2.so it skips at an empty data: URL; that never reaches the network.
  page.on('requestfailed', r => r.url().startsWith('data:') || seen.problems.push(`failed: ${r.url()}`));
  page.on('response', r => {
    if (r.status() >= 400) seen.problems.push(`HTTP ${r.status()}: ${r.url()}`);
    if (/assets\/content-[^/]*\.js$|runtime\/\w+\/worker\.js$/.test(r.url())) seen.loaded.push(r.url());
  });
  return seen;
}

async function setCode(page, code) {
  // Typed like a learner would. A busy browser now and then drops a keystroke, so check the editor
  // holds the code, and type it again if not.
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.click('.cm-content');
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(code);
    const typed = await page.$eval('.cm-content', el => [...el.querySelectorAll('.cm-line')].map(l => l.textContent).join('\n'));
    if (typed === code) return;
  }
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
  check('a first visit opens in the dark theme', (await page.evaluate(() => document.documentElement.dataset.theme)) === 'dark');

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
    const report = await page.$eval('.report a', a => a.href).catch(() => '');
    check(`${lang.id}: the koan links to a filled-in problem report`, report.includes('template=report-a-problem.yml') && report.includes(encodeURIComponent(first.id)), report.slice(0, 120));
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

    // Typing a long solution scrolls the page: back to the top, where the sticky header is clear.
    await page.evaluate(() => scrollTo(0, 0));
    await page.click('.crumbs a');
    await page.waitForSelector('.sections');
    check(`${lang.id}: the crumbs lead back to its path`, page.url().endsWith(`#/${lang.id}/`));
    const name = toolLanguages.find(l => l.id === lang.id).name;
    check(`${lang.id}: its path is titled with its name, with its emblem and site`,
      (await text(page, '.hero h1')) === name && !!(await page.$('.hero svg.emblem')) && !!(await page.$('.hero .site a[href^="https://"]')));
  }

  // JavaScript's line numbers come from each browser's stack traces. Another koan than the solved
  // one: these runs fail on purpose, and the latest run decides a koan's status.
  for (const [what, code, want] of [
    ['a failure after await', "await null;\nexpect(await Promise.resolve(1), 'later').toBe(2);", /line 2/],
    ['a failure inside a function', "function check() {\nexpect(1, 'inside').toBe(2);\n}\ncheck();", /line 2/],
    ['a syntax error', 'expect(true).toBe(true);\nlet x = = 1;', /line 2[\s\S]*SyntaxError/],
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
  // Fonts and interpreters included: everything comes from the site.
  const elsewhere = [...new Set(seen.requests.filter(u => !u.startsWith(base) && !/^(data|blob):/.test(u)))];
  check('nothing is requested from anywhere but the site', elsewhere.length === 0, elsewhere.join(' | '));
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
  check('on a phone: one language per row', phone.columns === 1, `${phone.columns} columns`);
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
    const file = koan === 'expectations' ? '01-expectations' : '02-equality';
    await run(page, readFileSync(join(root, `languages/javascript/koans/01-awakening/${file}.solution.js`), 'utf8').trimEnd(), /Enlightenment/);
  };
  await solve(a, 'expectations');
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

/**
 * Accessibility: axe (https://github.com/dequelabs/axe-core) on every kind of page, against WCAG 2.2
 * A and AA and axe's best practices, in both themes, on a desktop and a phone. Any finding fails.
 * The koan pages use JavaScript, whose interpreter starts at once: before a run, after a failing
 * one, and solved (on a phone, with the report open).
 */
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

async function audit(page, where) {
  await page.addScriptTag({ content: axeSource });
  const violations = await page.evaluate(async () => {
    // The editor scrolls sideways on a phone. axe counts its text as not focusable (its tabIndex
    // is -1), but text you can edit is: Tab reaches it, and the arrow keys scroll it. So that one
    // rule leaves the editor out (its own selector, plus .cm-scroller).
    axe.configure({ rules: [{ id: 'scrollable-region-focusable', selector: '*:not(select,textarea,.cm-scroller)' }] });
    const { violations } = await axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
    });
    return violations.flatMap(v => v.nodes.map(n => `${v.id}: ${n.target.join(' ')} (${n.failureSummary?.split('\n')[1]?.trim()})`));
  });
  check(`accessibility: ${where}`, violations.length === 0, violations.slice(0, 6).join(' | '));
}

async function checkAccessibility(browser, base) {
  const first = readKoans(toolLanguages.find(l => l.id === 'javascript'))[0].koans[0];
  for (const theme of ['dark', 'light']) {
    for (const phone of [false, true]) {
      const context = await browser.createBrowserContext();
      const page = await context.newPage();
      const where = `${theme} theme${phone ? ', phone' : ''}`;
      try {
        await page.setViewport(phone ? { width: 390, height: 844, isMobile: true, hasTouch: true } : { width: 1280, height: 900 });
        await page.evaluateOnNewDocument(t => localStorage.setItem('koans:theme', t), theme);
        await page.goto(`${base}#/`);
        await page.waitForSelector('.tile');
        await page.click('.keep-toggle');
        await audit(page, `the home page (${where})`);
        await page.goto(`${base}#/python/`);
        await page.waitForSelector('.hero h1');
        await audit(page, `a path (${where})`);
        await page.goto(`${base}#/javascript/koan/${first.id}`);
        await page.waitForSelector('.cm-content');
        await audit(page, `a koan (${where})`);
        await page.click(phone ? '.bar-run' : 'button.primary');
        await panel(page, /Meditate/);
        if (phone) await page.click('.summary');
        await audit(page, `a failing koan (${where})`);
        // On a phone the report is a sheet over the page, and Run is in the bar at the bottom.
        if (phone) await page.$eval('.sheet-close', b => b.click());
        await setCode(page, first.solution.trimEnd());
        await page.click(phone ? '.bar-run' : 'button.primary');
        await panel(page, /Enlightenment/);
        await audit(page, `a solved koan (${where})`);
      } finally {
        await context.close();
      }
    }
  }
}

/**
 * What koan code can't reach: the site's saved files, the learner's saved progress, and the channel
 * tabs sync it over, which every interpreter's worker removes before running koans (lockDown in
 * each worker.js). Asked from inside a koan, through each language's bridge to JavaScript (Lua,
 * Raku and SQL have none). A shared link's code runs the same way.
 */
const ASK = '[typeof caches, typeof indexedDB, typeof BroadcastChannel].join()';
const REACH = {
  javascript: `console.log(${ASK});`,
  typescript: `const g: any = globalThis; console.log([typeof g.caches, typeof g.indexedDB, typeof g.BroadcastChannel].join());`,
  python: `import js; print(js.eval(${JSON.stringify(ASK)}))`,
  r: `print(webr::eval_js(${JSON.stringify(ASK)}))`,
  ruby: `require 'js'; puts JS.eval(${JSON.stringify(`return ${ASK}`)})`,
  php: `<?php echo (new Vrzno)->eval(${JSON.stringify(ASK)});`,
};

async function checkSandbox(browser, base) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  try {
    for (const [id, code] of Object.entries(REACH)) {
      const first = readKoans(toolLanguages.find(l => l.id === id))[0].koans[0];
      await page.goto(`${base}#/${id}/koan/${first.id}`);
      await page.waitForSelector('.cm-content');
      const out = await run(page, code, /undefined|object|function|rror/);
      check(`${id}: koan code can't reach the site's saved files, progress or tabs`, out.includes('undefined,undefined,undefined'), out.slice(0, 160));
    }
  } finally {
    await context.close();
  }
}

/**
 * Sharing a koan: Share copies a link with the code in it (the clipboard is a stand-in that keeps
 * what it's given); opening it shows that code and a note, leaving the learner's own code saved;
 * "Back to your own code" brings theirs back; running the shared code makes it theirs; and a
 * damaged link says so.
 */
async function checkShare(browser, base) {
  const koan = readKoans(toolLanguages.find(l => l.id === 'javascript'))[0].koans[0];
  const href = `${base}#/javascript/koan/${koan.id}`;
  const editorText = page => page.$eval('.cm-content', el => [...el.querySelectorAll('.cm-line')].map(l => l.textContent).join('\n'));
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const seen = watch(page);
  try {
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'clipboard', { value: { writeText: text => ((window.__copied = text), Promise.resolve()) } });
    });
    // Someone shares their solution.
    const theirs = koan.solution.trimEnd();
    await page.goto(href);
    await page.waitForSelector('.cm-content');
    await setCode(page, theirs);
    await page.click('.share-button');
    await page.waitForSelector('.actions .share-note');
    const link = await page.evaluate(() => window.__copied);
    check('Share copies a link to the koan with the code in it, and says so',
      link?.startsWith(`${href}?code=`) && /Link copied/.test(await text(page, '.actions .share-note')), link);

    // The learner who opens it has code of their own, run once (so it's saved).
    const mine = `// mine\n${koan.code.trimEnd()}`;
    await page.goto('about:blank');
    await page.goto(href);
    await page.waitForSelector('.cm-content');
    await run(page, mine, /Meditate/);
    await page.goto(link);
    await page.waitForSelector('.shared');
    check('a shared link opens the koan with its code, and a note', (await editorText(page)) === theirs && /Shared code/.test(await text(page, '.shared')));
    check('which is not saved yet', /Nothing is saved until you run/.test(await text(page, 'aside .panel')));
    await audit(page, 'a koan opened from a shared link');
    await page.click('.shared button');
    check('"Back to your own code" brings the saved code back, and the link leaves the address',
      (await editorText(page)) === mine && !(await page.$('.shared')) && page.url() === href, page.url());

    await page.goto(link);
    await page.waitForSelector('.shared');
    await page.click('button.primary');
    await panel(page, /Enlightenment/);
    check('running shared code makes it the learner\'s attempt', !(await page.$('.shared')) && page.url() === href, page.url());
    await page.goto('about:blank');
    await page.goto(href);
    await page.waitForSelector('.cm-content');
    check('and it is saved', (await editorText(page)) === theirs);

    await page.goto(`${href}?code=${link.split('?code=')[1].slice(0, 12)}`);
    await page.waitForSelector('.shared');
    check("a damaged link says so and keeps the learner's code", /couldn't be read/.test(await text(page, '.shared')) && (await editorText(page)) === theirs);
    check('no console errors, failed requests or HTTP errors', seen.problems.length === 0, seen.problems.join(' | '));
  } finally {
    await context.close();
  }
}

/**
 * The pages for search engines and shared links (scripts/lib/pages.ts): each language's own page,
 * its plain HTML, and the app opening its path there, at the site's own address; and the sitemap.
 */
async function checkPages(browser, base) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const seen = watch(page);
  try {
    const sitemap = await (await fetch(`${base}sitemap.xml`)).text();
    check('the sitemap lists the home page and every language', LANGUAGES.every(l => sitemap.includes(`/${l.id}/</loc>`)), sitemap.slice(0, 200));
    for (const { id } of LANGUAGES) {
      const html = await (await fetch(`${base}${id}/`)).text();
      const name = toolLanguages.find(l => l.id === id).name;
      const first = koanIds[id][0];
      check(`${id}: its page has its title, preview and koans as HTML`,
        html.includes(`<title>${name} Koans · koans.app</title>`) && html.includes(`og:image" content="https://koans.app/social/${id}.png"`) &&
        html.includes(`<link rel="canonical" href="https://koans.app/${id}/"`) && html.includes(`href="../#/${id}/koan/${first.id}"`));
    }
    await page.goto(`${base}ruby/`);
    await page.waitForSelector('.hero h1');
    check("a language's page opens its path, at the site's address", page.url() === `${base}#/ruby/` && (await text(page, '.hero h1')) === 'Ruby', page.url());
    check('and its plain HTML gives way to the app', !(await page.$('.prerendered')));
    await page.click(`a[href="#/ruby/koan/${koanIds.ruby[0].id}"]`).catch(() => {});
    await page.waitForSelector('.cm-content', { timeout: 10000 }).catch(() => {});
    check('and its koans open as usual', page.url() === `${base}#/ruby/koan/${koanIds.ruby[0].id}`, page.url());
    // Leaving mid-download would cut off the fonts (as a failed request): let the page settle first.
    await page.waitForNetworkIdle({ idleTime: 500 }).catch(() => {});
    await page.goto(`${base}python/#/lua/`);
    await page.waitForSelector('.hero h1');
    check('a route after the # comes first', page.url() === `${base}#/lua/` && (await text(page, '.hero h1')) === 'Lua', page.url());
    check('no console errors, failed requests or HTTP errors', seen.problems.length === 0, seen.problems.join(' | '));
  } finally {
    await context.close();
  }
}

/**
 * Offline: a first visit, straight to a koan in each language, saves the site and the interpreters,
 * which then work with the server gone. On a server of its own, to stop it.
 */
async function checkOffline(browser) {
  const server = await preview({ root, logLevel: 'silent', preview: { port: 0, strictPort: false, open: false } });
  const base = server.resolvedUrls.local[0];
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  const seen = watch(page);
  const koans = LANGUAGES.map(({ id }) => {
    const first = readKoans(toolLanguages.find(l => l.id === id))[0].koans[0];
    return { id, href: `${base}#/${id}/koan/${first.id}`, solution: first.solution.trimEnd() };
  });
  let closed = false;
  try {
    for (const koan of koans) {
      await page.goto(koan.href);
      await page.waitForSelector('.cm-content');
      await run(page, koan.solution, /Enlightenment/);
    }
    // A language's own page, opened once, opens offline too.
    await page.goto(`${base}sql/`);
    await page.waitForSelector('.hero h1');
    // Saving the files goes on in the background: wait for every language's.
    const ids = LANGUAGES.map(l => l.id);
    await page
      .waitForFunction(async ids => {
        const names = await caches.keys();
        return ids.every(id => names.some(n => n.startsWith(`runtime-${id}-`)));
      }, { timeout: 30000 }, ids)
      .catch(() => {});
    const names = await page.evaluate(() => caches.keys());
    const missing = ids.filter(id => !names.some(n => n.startsWith(`runtime-${id}-`)));
    check('offline: every interpreter opened is saved', missing.length === 0, `not saved: ${missing.join(', ')}`);

    await server.close();
    closed = true;
    await page.goto(`${base}#/`);
    await page.waitForSelector('.tile');
    check('offline: the home page opens', true);
    await page.goto(`${base}sql/`);
    const sql = await page.waitForSelector('.hero h1', { timeout: 10000 }).then(() => text(page, '.hero h1'), () => '');
    check("offline: a language's page opened before opens", sql === 'SQL', sql);
    for (const koan of koans) {
      // A fresh page each time, not just a new route: everything comes from what was saved.
      await page.goto('about:blank');
      await page.goto(koan.href);
      await page.waitForSelector('.cm-content');
      const out = await run(page, koan.solution, /Enlightenment/);
      check(`offline: ${koan.id} runs its koan`, /Enlightenment/.test(out), out.slice(0, 100));
    }
    // Losing the server shows as failed requests (the service worker's checks for a new version).
    const other = seen.problems.filter(p => !/failed: |Failed to fetch|ERR_CONNECTION_REFUSED|NetworkError/.test(p));
    check('offline: no errors', other.length === 0, other.join(' | '));
  } finally {
    if (!closed) await server.close();
    await context.close();
  }
}

/**
 * A first visit on a slow connection (about 3 MB/s) says how far the interpreter's download has got,
 * then that it's starting, then nothing once it's ready. Chrome only: the slowing down goes through
 * Chrome's DevTools protocol, for the page, its workers and the service worker alike.
 */
async function checkLoading(browser, base) {
  const slow = { offline: false, latency: 50, downloadThroughput: 3e6, uploadThroughput: 1e6 };
  const throttle = async target => {
    if (!['page', 'worker', 'service_worker'].includes(target.type())) return;
    const session = await target.createCDPSession().catch(() => null);
    await session?.send('Network.enable').catch(() => {});
    await session?.send('Network.emulateNetworkConditions', slow).catch(() => {});
  };
  const context = await browser.createBrowserContext();
  // The browser's event, not the context's: a service worker's target only shows up there.
  browser.on('targetcreated', throttle);
  try {
    const page = await context.newPage();
    await throttle(page.target());
    await page.goto(`${base}#/python/koan/${koanIds.python[0].id}`);
    await page.waitForSelector('.cm-content');
    const said = [];
    const deadline = Date.now() + 60000;
    while (Date.now() < deadline) {
      const now = await text(page, 'aside .panel').catch(() => '');
      const what = now.match(/(Preparing|Downloading|Starting) Python…\s?([\d.]+ of [\d.]+ MB)?/)?.[0].trim() ?? 'ready';
      if (said.at(-1) !== what) said.push(what);
      if (what === 'ready' && said.length > 1) break;
      await new Promise(r => setTimeout(r, 100));
    }
    const downloading = said.filter(s => s.startsWith('Downloading'));
    const totals = new Set(downloading.map(s => s.split(' of ')[1]));
    check('a slow first visit counts the download up, in MB', downloading.length >= 3 && totals.size === 1, said.join(' → '));
    check('then says the interpreter is starting, then nothing', said.at(-2) === 'Starting Python…' && said.at(-1) === 'ready', said.slice(-3).join(' → '));
  } finally {
    browser.off('targetcreated', throttle);
    await context.close();
  }
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
      await checkPages(browser, base);
      await checkAccessibility(browser, base);
      await checkShare(browser, base);
      await checkSandbox(browser, base);
      await checkOffline(browser);
      if (name === 'chrome') await checkLoading(browser, base);
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
