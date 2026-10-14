// Raku's koans and editor mode: loaded only when someone opens Raku (see pack.ts).
import { raku } from './highlight';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/raku.json';

export default {
  manifest: manifest as Manifest,
  highlight: raku,
} satisfies LanguageContent;
