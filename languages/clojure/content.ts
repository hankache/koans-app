// Clojure's koans and editor mode: loaded only when someone opens Clojure (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { clojure } from '@codemirror/legacy-modes/mode/clojure';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/clojure.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(clojure),
} satisfies LanguageContent;
