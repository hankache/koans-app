// A koan and its hidden answers. Everything about a whole language's koans is in course.ts.

export interface Koan {
  id: string;
  title: string;
  intro: string;
  code: string;
  /** The answer for each blank: its line in `code` (0-based) and what replaces the ___. */
  answers: { line: number; answer: string }[];
}

/** An answer revealed for a line of the learner's code (1-based). */
export interface Reveal {
  line: number;
  answer: string;
  /** Where on that line the answer goes (0-based columns): the ___, or a wrong answer typed there. */
  start: number;
  end: number;
}

/**
 * Finds the answer for the blank on `preferLine` (the line the interpreter points at), or else for the
 * first line that still has a ___. Lines are matched by the text around their blank, so it
 * works even if the learner has added lines, or typed a wrong answer into that blank.
 */
export function revealAnswer(koan: Koan, code: string, preferLine?: number): Reveal | null {
  const original = koan.code.trimEnd().split('\n');
  const blanks = koan.answers.map(a => {
    const [before, after] = original[a.line].split('___');
    return { ...a, before, after };
  });
  const lines = code.split('\n');
  const targets = [
    ...(preferLine ? [preferLine] : []),
    ...lines.flatMap((l, i) => (l.includes('___') ? [i + 1] : [])),
  ];
  for (const n of targets) {
    const text = lines[n - 1];
    if (text === undefined) continue;
    const match = blanks
      .filter(b => text.startsWith(b.before) && text.endsWith(b.after) && text.length >= b.before.length + b.after.length)
      .sort((x, y) => Math.abs(x.line - (n - 1)) - Math.abs(y.line - (n - 1)))[0];
    if (!match) continue;
    const start = match.before.length, end = text.length - match.after.length;
    if (text.slice(start, end) === match.answer) continue; // already answered right: move on
    return { line: n, answer: match.answer, start, end };
  }
  return null;
}

export interface Section {
  id: string;
  title: string;
  blurb: string;
  koans: Koan[];
}
