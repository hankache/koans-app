function first<T>(items: T[]): T | undefined {
  return items[0];
}
assert.type<number | undefined>(first([1, 2]), 'T is inferred from the argument');
assert.type<string | undefined>(first(['a']), 'a different call, a different T');
assert.equal(first<string>([]), undefined, 'T can also be given explicitly');
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
assert.type<[string, number]>(pair('x', 1), 'several type parameters');
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
assert.equal(longest('ab', 'abc'), 'abc', 'extends asks for a length');
assert.type<number[]>(longest([1], [2, 3]), 'arrays have one too');
