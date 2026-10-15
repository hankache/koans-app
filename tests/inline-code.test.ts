// Code spans in text: backticks, and code-looking words in test descriptions.
import { describe, expect, test } from 'vitest';
import { codeLike, inlineCode } from '../src/lib/inline-code';

const show = (parts: { code: boolean; text: string }[]) => parts.map(p => (p.code ? `[${p.text}]` : p.text)).join('');

describe('inlineCode', () => {
  test('backticks make code', () => {
    expect(show(inlineCode('use `expect` here'))).toBe('use [expect] here');
  });
});

describe('codeLike', () => {
  test.each([
    ['.not turns an expectation around', '[.not] turns an expectation around'],
    ['toEqual compares contents', '[toEqual] compares contents'],
    ['toHaveLength checks a length', '[toHaveLength] checks a length'],
    ['&& wants both sides true', '[&&] wants both sides true'],
    ['+ joins strings', '[+] joins strings'],
    ['assert_equal compares', '[assert_equal] compares'],
    ['len() counts, then stops', '[len()] counts, then stops'],
    ['=== does not convert', '[===] does not convert'],
    ['% is the remainder, // divides', '[%] is the remainder, [//] divides'],
    ['toBe, then toEqual', '[toBe], then [toEqual]'],
  ])('%s', (text, want) => {
    expect(show(codeLike(text))).toBe(want);
  });

  test.each([
    'JavaScript joins strings',
    'TypeScript, with types',
    'a test that fails - or not',
    'e.g. this one',
    'the end.',
  ])('leaves plain words alone: %s', text => {
    expect(show(codeLike(text))).toBe(text);
  });

  test('backticks still work', () => {
    expect(show(codeLike('`a b` and toBe'))).toBe('[a b] and [toBe]');
  });
});
