// OCaml's koans and editor mode: loaded only when someone opens OCaml (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { oCaml } from '@codemirror/legacy-modes/mode/mllike';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/ocaml.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(oCaml),
} satisfies LanguageContent;
