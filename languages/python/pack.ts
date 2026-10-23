// Python for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: { name: 'pytest', url: 'https://pytest.org' },
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#3f7f78', dark: '#7fbfb5' },
    emblem:
      '<ellipse cx="32" cy="52.2" rx="11.2" ry="3.6" fill="none" stroke="{F}" stroke-width="3.6"/><ellipse cx="32" cy="47.6" rx="8.4" ry="3" fill="none" stroke="{F}" stroke-width="3.4"/><path d="M33.5 45.6 C37.5 42.5 29.5 40 31.5 36.6" fill="none" stroke="{F}" stroke-width="3.4" stroke-linecap="round"/><path d="M28.6 35.8 C29.2 33 32.6 31.8 36.4 33 C38 33.5 38.4 34.6 37.4 35.4 C35.4 37 30.8 37.6 28.6 35.8 Z" fill="{F}"/><circle cx="33.4" cy="34.1" r="0.85" fill="{C}"/><path d="M37.6 34.8 L40.2 34 M37.6 34.8 L40 36.2" fill="none" stroke="{F}" stroke-width="1.1" stroke-linecap="round"/>',
  },
  about:
    'Python reads almost like plain English, which makes it a favorite first language, and it’s just as much at home in professional work: web backends, automation, science, data analysis and machine learning. Its large standard library means many tasks need nothing extra installed. These koans cover numbers and strings, lists, dictionaries and sets, functions, generators, classes and exceptions, and a tour of the standard library.',
  site: { url: 'https://www.python.org', label: 'python.org' },
  // Said now and then when a koan passes, besides the lines every language shares.
  cheers: ['Readability counts.', 'Beautiful is better than ugly.', 'Simple is better than complex.'],
  // On the home page: under its name, where its path goes, its test framework, the filters it
  // shows under, and koans to try (each checked by tests/teasers.test.ts).
  tag: 'Readable by design',
  journey: 'From `assert` to generators, classes and the standard library.',
  framework: 'pytest',
  kinds: ['start', 'data', 'automate'],
  teasers: [
    { before: 'assert -7 // 2 == ', after: '', choices: ['-3', '-4', '-3.5'], answer: '-4', why: '// rounds down, toward minus infinity.' },
    { before: 'assert \'ab\' * 3 == ', after: '', choices: ['\'ababab\'', '\'ab3\'', 'TypeError'], answer: '\'ababab\'', why: 'Multiplying a string repeats it.' },
  ],
  // The koan as a file of its test framework, named its way (pytest: test_name.py), on the editor's bar.
  testFile: slug => `test_${slug.replaceAll('-', '_')}.py`,
  worker: { url: 'runtime/python/worker.js', type: 'module' },
  errors: {
    // A traceback names each frame's file and line; the koan is "<exec>", and its first frame is
    // the statement the koan was running: File "<exec>", line 3, in <module>.
    line: /File "<exec>", line (\d+)/,
    // The last line says what went wrong: "NameError: name 'x' is not defined".
    message: stderr => [...stderr].reverse().find(l => l.trim() !== '')?.trim() ?? 'Python stopped with an error.',
  },
  load: () => import('./content').then(m => m.default),
} satisfies LanguagePack;
