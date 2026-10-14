import { describe, expect, test } from 'vitest';
import { readKoans } from '../scripts/lib/koans.mjs';
import { koanById, revealAnswer, type Koan, type Reveal } from '../src/lib/koans';
import { report } from './raku';

const fill = (code: string, r: Reveal) => {
  const lines = code.split('\n');
  const line = lines[r.line - 1];
  lines[r.line - 1] = line.slice(0, r.start) + r.answer + line.slice(r.end);
  return lines.join('\n');
};

describe('revealAnswer', () => {
  const koan: Koan = {
    id: 'test/arithmetic',
    title: 'Arithmetic',
    intro: '',
    code: "is 1 + 1, ___, 'add';\nis 2 * 3, ___, 'multiply';\n",
    answers: [
      { line: 0, answer: '2' },
      { line: 1, answer: '6' },
    ],
  };

  test('the first blank, when no line is given', () => {
    expect(revealAnswer(koan, koan.code)).toEqual({ line: 1, answer: '2', start: 10, end: 13 });
  });

  test('the blank on the preferred line', () => {
    expect(revealAnswer(koan, koan.code, 2)).toMatchObject({ line: 2, answer: '6' });
  });

  test('a wrong answer typed into the blank is what gets replaced', () => {
    const code = koan.code.replace('___', '3');
    expect(revealAnswer(koan, code, 1)).toEqual({ line: 1, answer: '2', start: 10, end: 11 });
  });

  test('a blank already answered right is skipped', () => {
    expect(revealAnswer(koan, koan.code.replace('___', '2'))).toMatchObject({ line: 2, answer: '6' });
  });

  test('lines the learner added are allowed for', () => {
    expect(revealAnswer(koan, "say 'hi';\n" + koan.code)).toMatchObject({ line: 2, answer: '2' });
  });

  test('a preferred line without a blank falls back to the first ___', () => {
    expect(revealAnswer(koan, "say 'hi';\n" + koan.code, 1)).toMatchObject({ line: 2, answer: '2' });
  });

  test('nothing to reveal once every answer is right', () => {
    expect(revealAnswer(koan, "is 1 + 1, 2, 'add';\nis 2 * 3, 6, 'multiply';\n")).toBeNull();
  });
});

// Every koan as the browser sees it: the manifest the app ships, read by the app's own code.
describe.each(readKoans().flatMap(s => s.koans))('$id', ({ id, solution }) => {
  const koan = koanById.get(id)!;

  test('revealing every answer in turn gives the solution', () => {
    let code = koan.code;
    for (let i = 0; i <= koan.answers.length; i++) {
      const r = revealAnswer(koan, code);
      if (!r) break;
      code = fill(code, r);
    }
    expect(code.trimEnd()).toBe(solution.trimEnd());
  });

  test('unsolved, it fails on a blank, and the hint for that line is its answer', () => {
    const r = report(koan.code);
    if (r.status !== 'failed') throw new Error(`expected a failure, got ${r.status}: ${'message' in r ? r.message : ''}`);
    expect(r.failure.blank).toBe(true);
    expect(revealAnswer(koan, koan.code, r.failure.line)?.line).toBe(r.failure.line);
  });

  test('solved, it passes', () => {
    expect(report(solution).status).toBe('passed');
  });
});
