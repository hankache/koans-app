// The languages the app offers. Each is a folder here; its pack.ts describes it to the app,
// and its node.mjs to the build tools (listed in scripts/lib/languages.mjs).
import type { LanguagePack } from '../src/lib/language';
import raku from './raku/pack';

export const packs: LanguagePack[] = [raku];

/** The language the site shows. There's only one until the language picker arrives. */
export const pack: LanguagePack = raku;
