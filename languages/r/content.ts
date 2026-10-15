// R's koans and editor mode: loaded only when someone opens R (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { r } from '@codemirror/legacy-modes/mode/r';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/r.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(r),
} satisfies LanguageContent;
