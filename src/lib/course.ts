// An opened language: its koans, its learner's progress, and its interpreter. Opening one loads
// its content (koans and editor mode) and saved progress; the interpreter starts downloading
// when the course first asks for it.
import type { Extension } from '@codemirror/state';
import type { Koan, Section } from './koans';
import type { LanguageContent, LanguagePack } from './language';
import { progressFor, type Progress } from './progress.svelte';
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

  neighbours(id: string) {
    const i = this.allKoans.findIndex(k => k.id === id);
    return { prev: this.allKoans[i - 1], next: this.allKoans[i + 1] };
  }

  /** The address of this language's path, or of one of its koans. */
  href(koanId?: string): string {
    return href(this.pack.id, koanId);
  }

  /** Created lazily, but call early (e.g. when the path opens) to start downloading the interpreter. */
  getRuntime(): WasmRuntime {
    const { url, type } = this.pack.worker;
    return (this.runtime ??= new WasmRuntime(`${import.meta.env.BASE_URL}${url}`, type));
  }

  async runKoan(code: string): Promise<Report> {
    const { prelude, epilogue } = this.content.manifest;
    const result = await this.getRuntime().run(prelude + code + epilogue);
    return parseRun(result, code, this.preludeLines, this.pack.errors);
  }
}

const courses = new Map<string, Promise<Course>>();

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
