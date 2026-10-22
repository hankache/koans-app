// Takes the README's screenshots of a koan, in both themes: .github/readme/koan-dark.png and
// koan-light.png (GitHub shows the one matching the reader's theme). A Python koan part-way:
// three tests pass and the fourth fails, with Python's answer beside the learner's.
//
//   npm run build && node design/build-readme-screenshots.mjs
//
// Run it again after a visible change to the koan page. Rendered in the installed Chrome.
import { mkdirSync } from 'node:fs';
import { computeSystemExecutablePath } from '@puppeteer/browsers';
import puppeteer from 'puppeteer-core';
import { preview } from 'vite';

process.chdir(new URL('..', import.meta.url).pathname);

// Python's Division koan, its first three answers right and the fourth not.
const attempt = `assert 7 / 2 == 3.5, '/ gives a float'
assert 6 / 3 == 2.0, 'even when it divides exactly'
assert 7 // 2 == 3, '// rounds down'
assert -7 // 2 == -3, 'down means toward minus infinity, not toward zero'
assert 7 % 2 == ___, '% is the remainder'
assert -7 % 3 == ___, 'it takes the sign of the divisor'
assert divmod(17, 5) == ___, 'divmod gives quotient and remainder'`;

mkdirSync('.github/readme', { recursive: true });
const server = await preview({ logLevel: 'silent', preview: { port: 0 } });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? computeSystemExecutablePath({ browser: 'chrome', channel: 'stable' }),
  headless: true,
});
try {
  for (const theme of ['dark', 'light']) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 1180, height: 760, deviceScaleFactor: 2 });
    await page.evaluateOnNewDocument(t => localStorage.setItem('koans:theme', t), theme);
    await page.goto(`${server.resolvedUrls.local[0]}#/python/koan/numbers/division`);
    await page.waitForSelector('.cm-content');
    await page.waitForFunction(() => /Replace each/.test(document.querySelector('aside .panel')?.textContent ?? ''), { timeout: 60000 });
    // The attempt goes in as one paste: typed, the editor would close brackets and quotes itself.
    await page.click('.cm-content');
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');
    await (await page.createCDPSession()).send('Input.insertText', { text: attempt });
    await page.click('button.primary');
    await page.waitForFunction(() => /Not quite/.test(document.querySelector('aside .panel')?.textContent ?? ''), { timeout: 60000 });
    // The cursor and the editor's focus ring are noise in a picture.
    await page.evaluate(() => document.activeElement?.blur());
    await page.mouse.move(0, 0);
    await page.screenshot({ path: `.github/readme/koan-${theme}.png`, clip: { x: 0, y: 0, width: 1180, height: 640 } });
    await context.close();
  }
} finally {
  await browser.close();
  await server.close();
}
console.log('✓ .github/readme/koan-dark.png, koan-light.png');
