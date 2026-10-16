// Code in text: backtick spans, and a test description's words that are code in its koan.
import { describe, expect, test } from 'vitest';
import { codeWords, markCode } from '../scripts/lib/code-words.mjs';
import { inlineCode } from '../src/lib/inline-code';

const show = (parts: { code: boolean; text: string }[]) => parts.map(p => (p.code ? `[${p.text}]` : p.text)).join('');

describe('inlineCode', () => {
  test('backticks make code', () => {
    expect(show(inlineCode('use `expect` here'))).toBe('use [expect] here');
  });
});

describe('codeWords', () => {
  test('names, dotted names and operators, but not strings or comments', () => {
    const words = codeWords("expect(Object.is(NaN, NaN), 'Object.is says yes').toBe(true); // a comment here\n", '//');
    expect(words).toEqual(expect.arrayContaining(['Object.is', 'NaN', '.toBe', 'toBe', 'expect', 'true']));
    expect(words).not.toContain('says');
    expect(words).not.toContain('comment');
  });

  test('sigils, Ruby predicates and symbols, Raku hyphens, R dots', () => {
    expect(codeWords('my @list = 1, 2; is-deeply @list.elems, 2;', '#')).toEqual(expect.arrayContaining(['@list', 'is-deeply', '.elems']));
    expect(codeWords('expect([].empty?).to be(true)\nh = { a: :sym }', '#')).toEqual(expect.arrayContaining(['empty?', ':sym']));
    expect(codeWords('expect_true(is.na(NA))', '#')).toEqual(expect.arrayContaining(['is.na', 'NA']));
  });

  test('a comment marker inside a string is not a comment', () => {
    expect(codeWords("x = '# not a comment'; y = len(x)", '#')).toEqual(expect.arrayContaining(['len']));
  });
});

describe('markCode', () => {
  const words = new Set(codeWords("expect(Object.is(NaN, NaN)).toBe(true); expect([1, 2]).toEqual([1, 2]); x.not.toBe(1); a && b; 'a' + 'b'; s.is_a?(String)", '//'));
  test.each([
    ['Object.is says NaN is NaN', '[Object.is] says [NaN] is [NaN]'],
    ['.not turns an expectation around', '[.not] turns an expectation around'],
    ['toEqual compares contents', '[toEqual] compares contents'],
    ['&& wants both sides true', '[&&] wants both sides [true]'],
    ['+ joins strings', '[+] joins strings'],
    ['is_a? asks the class', '[is_a?] asks the class'],
    ['toBe, then toEqual.', '[toBe], then [toEqual].'],
    ['.not.toBe wants a difference', '[.not.toBe] wants a difference'],
  ])('%s', (text, want) => {
    expect(show(markCode(text, words))).toBe(want);
  });

  test('English words stay text, even when they are code', () => {
    const w = new Set(codeWords('x is not None and y in z', '#'));
    expect(show(markCode('is not in and None', w))).toBe('is not in and [None]');
  });

  test('words that are not in the koan stay text', () => {
    expect(show(markCode('JavaScript joins strings', words))).toBe('JavaScript joins strings');
  });

  test('backticks force code', () => {
    expect(show(markCode('`not` and `is`', words))).toBe('[not] and [is]');
  });
});
