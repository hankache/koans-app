// PHP's koans and editor mode: loaded only when someone opens PHP (see pack.ts).
import { php } from '@codemirror/lang-php';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/php.json';

export default {
  manifest: manifest as Manifest,
  highlight: php(),
} satisfies LanguageContent;
