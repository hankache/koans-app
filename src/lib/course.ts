// An opened language: its koans, its learner's progress, and its interpreter. Opening one loads
// its content (koans and editor mode) and saved progress; the interpreter starts downloading
// when the course first asks for it. Only one interpreter runs at a time: asking for a language's
// stops the one before, so a tab that visits several languages doesn't hold them all in memory.
import type { Extension } from '@codemirror/state';
import type { Koan, Section } from './koans';
import type { LanguageContent, LanguagePack } from './language';
import { progressFor, type Progress } from './progress.svelte';
import { whenControlled } from './offline';
import { href } from './route';
import { WasmRuntime } from './runtime/wasm-runtime';
import { parseRun, type Report } from './tap';

export class Course {
  readonly sections: Section[];
  readonly allKoans: Koan[];
  readonly koanById: Map<string, Koan>;
  readonly highlight: Extension;
  private runtime?: WasmRuntime;
  private preludeLines: number;

  constructor(
    readonly pack: LanguagePack,
    private content: LanguageContent,
    readonly progress: Progress,
  ) {
    this.sections = content.manifest.sections;
    this.allKoans = this.sections.flatMap(s => s.koans);
    this.koanById = new Map(this.allKoans.map(k => [k.id, k]));
    this.highlight = content.highlight;
    this.preludeLines = content.manifest.prelude.split('\n').length - 1;
  }

  sectionOf(id: string): Section {
    return this.sections.find(s => s.koans.some(k => k.id === id))!;
  }

  neighbors(id: string) {
    const i = this.allKoans.findIndex(k => k.id === id);
    return { prev: this.allKoans[i - 1], next: this.allKoans[i + 1] };
  }

  /** The address of this language's path, or of one of its koans. */
  href(koanId?: string): string {
    return href(this.pack.id, koanId);
  }

  /** Created lazily, but call early (e.g. when the path opens) to start downloading the interpreter. */
  getRuntime(): WasmRuntime {
    if (active !== this) {
      active?.stopRuntime();
      active = this;
    }
    const { url, type } = this.pack.worker;
    // On a first visit, after the service worker takes over, so the interpreter is saved for offline use.
    return (this.runtime ??= new WasmRuntime(`${import.meta.env.BASE_URL}${url}`, type, whenControlled()));
  }

  /** Frees the interpreter; the next getRuntime starts a new one. */
  stopRuntime() {
    this.runtime?.stop();
    this.runtime = undefined;
  }

  async runKoan(code: string): Promise<Report> {
    const { prelude, epilogue } = this.content.manifest;
    const result = await this.getRuntime().run(prelude + code + epilogue);
    return parseRun(result, code, this.preludeLines, this.pack.errors);
  }
}

const courses = new Map<string, Promise<Course>>();
/** The course whose interpreter is running, if any. */
let active: Course | null = null;

/** Opens a language, once per page: later calls get the same course. */
export function openCourse(pack: LanguagePack): Promise<Course> {
  let course = courses.get(pack.id);
  if (!course) {
    const progress = progressFor(pack.id);
    course = Promise.all([pack.load(), progress.ready()]).then(([content]) => new Course(pack, content, progress));
    // A failed load (say, offline) can be retried by opening the language again.
    course.catch(() => courses.delete(pack.id));
    courses.set(pack.id, course);
  }
  return course;
}
