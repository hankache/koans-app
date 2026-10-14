// languages/<id>/koans/ → src/generated/<id>.json (the manifest the app loads), for each
// language, or those named with --lang. Whole solutions stay out of the bundle; each blank's
// answer goes in, for the result panel's hidden answer.
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { blanksOf, readKoans } from './lib/koans.mjs';
import { chosenLanguages } from './lib/languages.mjs';

const out = fileURLToPath(new URL('../src/generated/', import.meta.url));
mkdirSync(out, { recursive: true });

for (const lang of chosenLanguages()) {
  const sections = readKoans(lang).map(s => ({
    ...s,
    koans: s.koans.map(k => ({ id: k.id, title: k.title, intro: k.intro, code: k.code, answers: blanksOf(k).blanks.map(b => ({ line: b.line, answer: b.answer })) })),
  }));
  const manifest = { prelude: lang.prelude(), epilogue: lang.epilogue, sections };
  writeFileSync(`${out}${lang.id}.json`, JSON.stringify(manifest, null, 2) + '\n');
  const count = sections.reduce((n, s) => n + s.koans.length, 0);
  console.log(`✓ ${lang.name}: ${count} koans in ${sections.length} sections → src/generated/${lang.id}.json`);
}
