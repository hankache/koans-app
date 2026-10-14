// Runs every koan of each language (or those named with --lang) on that language's interpreter,
// the same engine as the browser, and checks:
//   • the koan has a solution file
//   • the unsolved koan contains a ___, and every line with a ___ fails on its own
//     (a blank that passes unfilled, or a crash that hides later blanks, is caught)
//   • the solution has no ___ and passes every test
//   • the solution lines up with the koan: the same lines, each ___ alone on its line and
//     replaced by its answer (the result panel's hidden answer relies on this)
//   • the language's own lint passes (for Raku: types are compared with is-deeply)
import { blanksOf, readKoans } from './lib/koans.mjs';
import { chosenLanguages } from './lib/languages.mjs';

// As in TAP: a `not ok … # TODO` is not a failure.
const passed = ({ rc, lines }) =>
  rc === 0 && !lines.some(l => l.text.startsWith('not ok') && !/# TODO\b/i.test(l.text));
// Learner lines reported as failing: the prelude adds "at web line N" to each failure.
const failingLines = ({ lines }, offset) =>
  new Set(lines.flatMap(l => [...l.text.matchAll(/at web line (\d+)/g)].map(m => Number(m[1]) - offset)));

let failures = 0;
const fail = (koan, why, lines = []) => {
  failures++;
  console.log(`✗ ${koan.file}: ${why}`);
  for (const l of lines) console.log(`    ${l.text.replace(/\x1b\[[0-9;]*m/g, '')}`);
};

for (const lang of chosenLanguages()) {
  const engine = await lang.load();
  const prelude = lang.prelude();
  const offset = prelude.split('\n').length - 1;
  const run = code => engine.run(prelude + code + lang.epilogue);
  console.log(`${lang.name} (interpreter ${engine.version})`);
  for (const section of readKoans(lang)) {
    for (const koan of section.koans) {
      if (!koan.code.includes('___')) { fail(koan, 'koan has no ___ blank to fill in'); continue; }
      for (const problem of lang.lint(koan.code)) fail(koan, problem);
      const unsolved = await run(koan.code);
      const failing = failingLines(unsolved, offset);
      const silent = koan.code.split('\n').flatMap((l, i) => (l.includes('___') && !failing.has(i + 1) ? [i + 1] : []));
      if (silent.length) fail(koan, `blank on line ${silent.join(', ')} does not fail when left unfilled`, unsolved.lines);

      if (koan.solution == null) { fail(koan, `missing .solution${lang.extension}`); continue; }
      if (koan.solution.includes('___')) { fail(koan, 'solution still contains ___'); continue; }
      const { problems } = blanksOf(koan);
      if (problems.length) { fail(koan, `does not line up with its solution: ${problems.join('; ')}`); continue; }
      const solved = await run(koan.solution);
      if (!passed(solved)) { fail(koan, 'solution does not pass', solved.lines); continue; }

      console.log(`✓ ${koan.id}`);
    }
  }
}

if (failures) {
  console.log(`\n${failures} problem(s).`);
  process.exit(1);
}
console.log('\nAll koans are sound.');
