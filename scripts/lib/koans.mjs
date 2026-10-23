// Reads a language's koans into a structured list. Shared by build-koans, check-koans and the tests.
//
// Layout, for each language in languages/ (see scripts/lib/languages.mjs):
//   languages/<id>/koans/NN-section/_section.json            { "title", "blurb" }
//   languages/<id>/koans/NN-section/NN-name<ext>              the koan: header comments, then code with ___ blanks
//   languages/<id>/koans/NN-section/NN-name.solution<ext>     the same code, blanks filled (never shipped to the browser)
//
// Numeric prefixes set the order but are dropped from ids, so koans can be
// reordered without losing anyone's saved progress.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const escape = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** @param {import('./languages.mjs').Language} lang */
export function readKoans(lang) {
  const koansDir = join(lang.dir, 'koans');
  const ext = escape(lang.extension);
  const slug = name => name.replace(/^\d+-/, '').replace(new RegExp(`(\\.solution)?${ext}$`), '');
  const end = lang.commentEnd ? `(?:\\s*${escape(lang.commentEnd)})` : '';
  const header = new RegExp(`^${escape(lang.comment)}\\s*(\\w+):\\s*(.*?)${end}$`);
  const isKoan = new RegExp(`^\\d+-.*${ext}$`);

  const sections = [];
  for (const dir of readdirSync(koansDir).filter(d => /^\d+-/.test(d)).sort()) {
    const path = join(koansDir, dir);
    const meta = JSON.parse(readFileSync(join(path, '_section.json'), 'utf8'));
    const section = { id: slug(dir), title: meta.title, blurb: meta.blurb ?? '', koans: [] };

    const files = readdirSync(path).filter(f => isKoan.test(f) && !f.endsWith(`.solution${lang.extension}`)).sort();
    for (const file of files) {
      const lines = readFileSync(join(path, file), 'utf8').split('\n');
      const meta = {};
      while (lines.length && header.test(lines[0])) {
        const [, key, value] = lines.shift().match(header);
        meta[key] = value;
      }
      const solutionPath = join(path, file.slice(0, -lang.extension.length) + `.solution${lang.extension}`);
      section.koans.push({
        id: `${section.id}/${slug(file)}`,
        title: meta.title ?? slug(file),
        intro: meta.intro ?? '',
        code: lines.join('\n').trim() + '\n',
        file: join(lang.id, 'koans', dir, file),
        solution: existsSync(solutionPath) ? readFileSync(solutionPath, 'utf8') : null,
      });
    }
    sections.push(section);
  }
  return sections;
}

/**
 * Lines up a koan with its solution and returns each blank's answer:
 * { line (0-based), before, after, answer }, where the koan's line is before + ___ + after
 * and the solution's line is before + answer + after. Also returns the problems that prevent
 * that: a line count that differs, two blanks on one line, or other lines that differ.
 */
export function blanksOf(koan) {
  const code = koan.code.trimEnd().split('\n');
  const solution = (koan.solution ?? '').trimEnd().split('\n');
  const blanks = [];
  const problems = [];
  if (code.length !== solution.length) {
    problems.push(`has ${code.length} lines but its solution has ${solution.length}`);
    return { blanks, problems };
  }
  code.forEach((line, i) => {
    const parts = line.split('___');
    if (parts.length > 2) return problems.push(`line ${i + 1} has more than one ___`);
    if (parts.length === 1) {
      if (line !== solution[i]) problems.push(`line ${i + 1} differs from the solution but has no ___`);
      return;
    }
    const [before, after] = parts;
    const s = solution[i];
    if (!s.startsWith(before) || !s.endsWith(after) || s.length < before.length + after.length) {
      return problems.push(`line ${i + 1} does not match its solution around the ___`);
    }
    blanks.push({ line: i, before, after, answer: s.slice(before.length, s.length - after.length) });
  });
  return { blanks, problems };
}
