// Python for the app. Its build tools' side is node.mjs.
import type { LanguagePack } from '../../src/lib/language';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: '`unittest`-style assertions',
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
