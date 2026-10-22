import { expect, test } from 'vitest';
import { href, parseRoute } from '../src/lib/route';

const route = (hash: string) => parseRoute(hash, ['raku', 'python'], 'raku');

test('the home page', () => {
  for (const hash of ['', '#', '#/']) expect(route(hash)).toEqual({ page: 'home' });
});

test("a language's path", () => {
  expect(route('#/python/')).toEqual({ page: 'path', lang: 'python' });
  expect(route('#/python')).toEqual({ page: 'path', lang: 'python' });
});

test('a koan, whose id is section/name', () => {
  expect(route('#/python/koan/strings/split-and-join')).toEqual({ page: 'koan', lang: 'python', id: 'strings/split-and-join' });
});

test('a koan address without a koan is the path', () => {
  expect(route('#/raku/koan/')).toEqual({ page: 'path', lang: 'raku' });
});

test('an unknown language goes home', () => {
  expect(route('#/cobol/koan/a/b')).toEqual({ page: 'home' });
});

test('Raku Koans addresses lead to the same koan under #/raku/', () => {
  expect(route('#/koan/lists-and-hashes/hashes')).toEqual({ page: 'redirect', to: '#/raku/koan/lists-and-hashes/hashes' });
});

test('href makes the addresses parseRoute reads', () => {
  expect(route(href('python'))).toEqual({ page: 'path', lang: 'python' });
  expect(route(href('raku', 'numbers/division'))).toEqual({ page: 'koan', lang: 'raku', id: 'numbers/division' });
});

test('a koan with shared code: the code is read from after the ?', () => {
  expect(route('#/python/koan/numbers/division?code=abc-_1')).toEqual({ page: 'koan', lang: 'python', id: 'numbers/division', shared: 'abc-_1' });
  expect(route('#/python/koan/numbers/division?code=')).toEqual({ page: 'koan', lang: 'python', id: 'numbers/division' });
  expect(route('#/python/?code=abc')).toEqual({ page: 'path', lang: 'python' });
});
