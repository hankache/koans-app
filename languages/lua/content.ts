// Lua's koans and editor mode: loaded only when someone opens Lua (see pack.ts).
import { StreamLanguage } from '@codemirror/language';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import type { LanguageContent, Manifest } from '../../src/lib/language';
import manifest from '../../src/generated/lua.json';

export default {
  manifest: manifest as Manifest,
  highlight: StreamLanguage.define(lua),
} satisfies LanguageContent;
