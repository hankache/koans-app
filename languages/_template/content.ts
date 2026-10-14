// LANGUAGE's koans and editor mode: loaded only when someone opens LANGUAGE (see pack.ts).
// Copied from languages/_template: replace every LANGUAGE and lang-id.
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/lang-id.json';
// TODO: a CodeMirror language: an @codemirror/lang-* package, @codemirror/legacy-modes, or a mode
// of your own (see languages/raku/highlight.ts).
import { TODO } from '@codemirror/lang-TODO';

export default {
  manifest: manifest as Manifest,
  highlight: TODO(),
} satisfies LanguageContent;
