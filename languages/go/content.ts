// Go's koans and editor mode: loaded only when someone opens Go (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/go.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(go),
} satisfies LanguageContent;
