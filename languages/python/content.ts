// Python's koans and editor mode: loaded only when someone opens Python (see pack.ts).
import { python } from '@codemirror/lang-python';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/python.json';

export default {
  manifest: manifest as Manifest,
  highlight: python(),
} satisfies LanguageContent;
