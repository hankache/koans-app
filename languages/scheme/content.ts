// Scheme's koans and editor mode: loaded only when someone opens Scheme (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { scheme } from '@codemirror/legacy-modes/mode/scheme';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/scheme.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(scheme),
} satisfies LanguageContent;
