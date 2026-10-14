// TypeScript's koans and editor mode: loaded only when someone opens TypeScript (see pack.ts).
import { javascript } from '@codemirror/lang-javascript';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/typescript.json';

export default {
  manifest: manifest as Manifest,
  highlight: javascript({ typescript: true }),
} satisfies LanguageContent;
