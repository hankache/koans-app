// Python for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: 'pytest-style `assert` statements',
  // Its emblem: a symbol drawn under the gate (src/components/Emblem.svelte), in a 64-unit box.
  look: {
    accent: { light: '#3f7f78', dark: '#7fbfb5' },
    emblem:
      '<path d="M35.6 35.2 C29.6 34 25.8 37.4 28.4 41 C30.6 43.8 36.8 43.6 37.2 48.2 C37.6 52.8 31.6 56 25.8 53.4" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/><circle cx="37.4" cy="35.6" r="2.9" fill="currentColor"/>',
  },
  about:
    'Python is a general-purpose language known for readable code and a large standard library, used for everything from scripts and websites to data science and machine learning. These koans cover its values and collections, functions, generators, classes, exceptions and standard library.',
  site: { url: 'https://www.python.org', label: 'python.org' },
  sample: 'assert 1 + 1 == 2',
  teaser: { before: 'assert -7 // 2 == ', after: '', choices: ['-3', '-4', '-3.5'], answer: '-4', why: '// rounds down, toward minus infinity.' },
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
