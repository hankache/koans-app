// The languages the site offers, in the order the home page lists them: alphabetical. Each is a folder here;
// its pack.ts describes it to the app, and its node.mjs to the build tools (listed in
// scripts/lib/languages.mjs).
import type { LanguagePack } from '../src/lib/language';
import clojure from './clojure/pack';
import javascript from './javascript/pack';
import lua from './lua/pack';
import php from './php/pack';
import python from './python/pack';
import r from './r/pack';
import raku from './raku/pack';
import ruby from './ruby/pack';
import scheme from './scheme/pack';
import sql from './sql/pack';
import typescript from './typescript/pack';

export const packs: LanguagePack[] = [clojure, javascript, lua, php, python, r, raku, ruby, scheme, sql, typescript];

export const packById = new Map(packs.map(p => [p.id, p]));

/** The language of addresses from before koans.app had several (Raku Koans' #/koan/…). */
export const legacyLanguage = 'raku';
