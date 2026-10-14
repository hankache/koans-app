// The languages the site offers, in the order the home page lists them. Each is a folder here;
// its pack.ts describes it to the app, and its node.mjs to the build tools (listed in
// scripts/lib/languages.mjs).
import type { LanguagePack } from '../src/lib/language';
import javascript from './javascript/pack';
import python from './python/pack';
import raku from './raku/pack';

export const packs: LanguagePack[] = [raku, python, javascript];

export const packById = new Map(packs.map(p => [p.id, p]));

/** The language of addresses from before koans.app had several (Raku Koans' #/koan/…). */
export const legacyLanguage = 'raku';
