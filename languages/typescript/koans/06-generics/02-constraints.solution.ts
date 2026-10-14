function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
expect(longest('tea', 'cake'), 'strings have a length').toBe('cake');
expect(longest([1, 2], [3]), 'arrays do too').toEqual([1, 2]);
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const book = { title: 'Koans', pages: 120 };
expectTypeOf(pluck(book, 'pages')).toEqualTypeOf<number>(); // K is 'pages', so T[K] is number
expect(pluck(book, 'title'), 'and the value').toBe('Koans');
