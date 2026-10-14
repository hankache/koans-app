// Python for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: 'pytest-style `assert` statements',
  look: { monogram: 'Py', accent: { light: '#3f7f78', dark: '#7fbfb5' } },
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
