// Prolog's koans and editor mode: loaded only when someone opens Prolog (see pack.ts).
import { prolog } from './highlight';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/prolog.json';

export default {
  manifest: manifest as Manifest,
  highlight: prolog,
} satisfies LanguageContent;
