// Ruby's koans and editor mode: loaded only when someone opens Ruby (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/ruby.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(ruby),
} satisfies LanguageContent;
