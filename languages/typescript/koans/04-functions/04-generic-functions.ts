// title: Generic functions
// intro: A type parameter `<T>` lets a function work with any type while keeping track of which one. `T extends X` limits it to types that fit `X`.
function first<T>(items: T[]): T | undefined {
  return items[0];
}
assert.type<___>(first([1, 2]), 'T is inferred from the argument');
assert.type<___>(first(['a']), 'a different call, a different T');
assert.equal(first<string>([]), ___, 'T can also be given explicitly');
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
assert.type<___>(pair('x', 1), 'several type parameters');
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
assert.equal(longest('ab', 'abc'), ___, 'extends asks for a length');
assert.type<___>(longest([1], [2, 3]), 'arrays have one too');
