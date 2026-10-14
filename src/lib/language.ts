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

/** A language, as the site knows it before it's opened. */
export interface LanguagePack {
  /** Used in addresses, storage keys and file paths: 'raku'. */
  id: string;
  /** Shown to people: 'Raku'. */
  name: string;
  /** Finishes "… through 105 browser-based koans." on the home page: 'Learn Raku from syntax to culture'. */
  tagline: string;
  /** Finishes "fix failing tests written with …", with `code` in backticks: 'Raku’s `Test` module'. */
  testedWith: string;
  /** The language's artwork, relative to the site root. Without it, the gateless gate stands in. */
  art?: {
    logo: { src: string; alt: string };
    /** Folder with the gate.webp, door.webp and butterfly.webp layers of the "passed" animation. */
    celebration: string;
  };
  /** The interpreter's Web Worker, relative to the site root (see wasm-runtime.ts for its protocol). */
  worker: { url: string; type: WorkerType };
  errors: ErrorSyntax;
  /** Loads the language's content (languages/<id>/content.ts), in a separate file of the build. */
  load(): Promise<LanguageContent>;
}
