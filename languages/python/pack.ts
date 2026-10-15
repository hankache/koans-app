// Python for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: 'pytest-style `assert` statements',
  // Its emblem's symbol, drawn in the gate's doorway (src/components/Emblem.svelte): {F} solid, {C} cut out.
  look: {
    accent: { light: '#3f7f78', dark: '#7fbfb5' },
    emblem:
      '<g transform="translate(-1.4 0)"><path d="M40 33.5 C31 30.5 22.5 34 25.5 39.5 C28 44 38.5 42 39.5 48 C40.5 54 31 57 22.5 53.5" fill="none" stroke="{F}" stroke-width="5" stroke-linecap="round"/><circle cx="41.5" cy="33.8" r="4.4" fill="{F}"/><circle cx="42.8" cy="32.6" r="1.1" fill="{C}"/><path d="M45.6 34.6 L48.6 33.4 M45.6 34.6 L48.4 36.4" fill="none" stroke="{F}" stroke-width="1.3" stroke-linecap="round"/></g>',
  },
  about:
    'Python is a general-purpose language known for readable code and a large standard library, used for everything from scripts and websites to data science and machine learning. These koans cover its values and collections, functions, generators, classes, exceptions and standard library.',
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
