// JavaScript's koans and editor mode: loaded only when someone opens JavaScript (see pack.ts).
import { javascript } from '@codemirror/lang-javascript';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/javascript.json';

export default {
  manifest: manifest as Manifest,
  highlight: javascript(),
} satisfies LanguageContent;
