// Python for the app. Its build tools' side is node.mjs.
import { python } from '@codemirror/lang-python';
import type { LanguagePack, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/python.json';

export default {
  id: 'python',
  name: 'Python',
  tagline: 'Learn Python from the first assertion to its built-in collections',
  testedWith: '`unittest`-style assertions',
  worker: { url: 'runtime/python/worker.js', type: 'module' },
  manifest: manifest as Manifest,
  highlight: python(),
  errors: {
    // A traceback names each frame's file and line; the koan is "<exec>", and its first frame is
    // the statement the koan was running: File "<exec>", line 3, in <module>.
    line: /File "<exec>", line (\d+)/,
    // The last line says what went wrong: "NameError: name 'x' is not defined".
    message: stderr => [...stderr].reverse().find(l => l.trim() !== '')?.trim() ?? 'Python stopped with an error.',
  },
} satisfies LanguagePack;
