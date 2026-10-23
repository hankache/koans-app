// What the app needs to know about a language. Each one lives in languages/<id>/pack.ts;
// the build tools' side of it is languages/<id>/node.mjs.
import type { Extension } from '@codemirror/state';
import type { Section } from './koans';

/** src/generated/<id>.json, written by `npm run build:koans`. */
export interface Manifest {
  /** Run before the learner's code. */
  prelude: string;
  /** Run after it. */
  epilogue: string;
  sections: Section[];
}

/** How the language's interpreter reports errors outside the tests. */
export interface ErrorSyntax {
  /** Finds the line (as the interpreter counts it, prelude included) in an error message. */
  line: RegExp;
  /** The error's message, made readable (no banners, no line number), from all of stderr. */
  message(stderr: string[]): string;
  /** About how deep recursion can go in the browser, if known: shown when it overflows. */
  recursionLimit?: number;
}

/** The heavy part of a language, loaded when it's opened: its koans and its editor mode. */
export interface LanguageContent {
  manifest: Manifest;
  highlight: Extension;
}

/** The home page's filters, answering "What do you want to do?". */
export type Kind = 'start' | 'web' | 'data' | 'automate' | 'think';

/** A one-blank koan for the home page's "try one", answered by tapping one of `choices`. */
export interface Teaser {
  /** A line shown above the one with the blank, if the koan needs one. */
  context?: string;
  before: string;
  after: string;
  choices: string[];
  answer: string;
  /** One sentence on why, shown with the right answer. */
  why: string;
}

/** A language, as the site knows it before it's opened. */
export interface LanguagePack {
  /** Used in addresses, storage keys and file paths: 'raku'. */
  id: string;
  /** Shown to people: 'Raku'. */
  name: string;
  /** Finishes "… through 105 browser-based koans." on the home page: 'Learn Raku from syntax to culture'. */
  tagline: string;
  /** Finishes "fix failing tests written with …" on its path page: its test framework, linked: 'pytest'. */
  testedWith: { name: string; url: string };
  /**
   * How it looks: an accent color for each theme, and its emblem's symbol: SVG drawn in the
   * gate's doorway of a 64-unit box, its solid parts in {F} and its cut-outs in {C} (see Emblem.svelte).
   */
  look: { accent: { light: string; dark: string }; emblem: string };
  /** A few sentences on the language, ending with what its koans cover, `code` in backticks: its path page says it. */
  about: string;
  /** Its official site, linked from its path page. */
  site: { url: string; label: string };
  /** What it's for, in a few words, under its name on the home page: 'Readable, and everywhere'. */
  tag: string;
  /** Where its path goes, one sentence, `code` in backticks: 'From `assert` to generators and dataclasses.' */
  journey: string;
  /** Its test framework, short, on its tile: 'pytest'. */
  framework: string;
  /** The home page's filters it shows under. */
  kinds: Kind[];
  /** A koan's file name in the language's test convention, from the last part of its id: 'test_slicing.py'. */
  testFile(slug: string): string;
  /** Koans to try on the home page (tests/teasers.test.ts runs each through the interpreter). */
  teasers: Teaser[];
  /** Lines of its own, added to the ones every language may show when a koan passes. */
  cheers?: string[];
  /** The interpreter's Web Worker, relative to the site root (see wasm-runtime.ts for its protocol). */
  worker: { url: string; type: WorkerType };
  errors: ErrorSyntax;
  /** Loads the language's content (languages/<id>/content.ts), in a separate file of the build. */
  load(): Promise<LanguageContent>;
}
