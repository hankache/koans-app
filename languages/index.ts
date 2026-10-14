// The languages the app offers. Each is a folder here; its pack.ts describes it to the app,
// and its node.mjs to the build tools (listed in scripts/lib/languages.mjs).
import type { LanguagePack } from '../src/lib/language';
import python from './python/pack';
import raku from './raku/pack';

export const packs: LanguagePack[] = [raku, python];

// Until the language picker (PLAN.md, phase 3): ?lang=python in the address picks a language.
const wanted = typeof location === 'undefined' ? null : new URLSearchParams(location.search).get('lang');

/** The language the site shows. */
export const pack: LanguagePack = packs.find(p => p.id === wanted) ?? raku;
