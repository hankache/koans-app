// languages/<id>/koans/ → src/generated/<id>.json (the manifest the app loads when the language
// is opened), for each language, or those named with --lang. Whole solutions stay out of the
// bundle; each blank's answer goes in, for the result panel's hidden answer.
//
// Also src/generated/summary.json: each language's koan ids, small enough for the home page to
// show everyone's progress without loading any language.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { blanksOf, readKoans } from './lib/koans.mjs';
import { chosenLanguages } from './lib/languages.mjs';

const out = fileURLToPath(new URL('../src/generated/', import.meta.url));
mkdirSync(out, { recursive: true });
const summaryPath = out + 'summary.json';
const summary = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, 'utf8')) : {};

for (const lang of chosenLanguages()) {
  const sections = readKoans(lang).map(s => ({
    ...s,
    koans: s.koans.map(k => ({ id: k.id, title: k.title, intro: k.intro, code: k.code, answers: blanksOf(k).blanks.map(b => ({ line: b.line, answer: b.answer })) })),
  }));
  const manifest = { prelude: lang.prelude(), epilogue: lang.epilogue, sections };
  writeFileSync(`${out}${lang.id}.json`, JSON.stringify(manifest, null, 2) + '\n');
  summary[lang.id] = sections.flatMap(s => s.koans.map(k => k.id));
  const count = sections.reduce((n, s) => n + s.koans.length, 0);
  console.log(`✓ ${lang.name}: ${count} koans in ${sections.length} sections → src/generated/${lang.id}.json`);
}

writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + '\n');
