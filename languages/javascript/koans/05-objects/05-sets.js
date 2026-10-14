// title: Sets
// intro: A `Set` holds each value once, in the order it was first added, and has the operations of set theory: `union`, `intersection` and `difference`.
const s = new Set([1, 1, 2, 3]);
assert.equal(s.size, ___, 'duplicates collapse');
assert.equal(s.has(2), ___, 'has asks for a value');
assert.deepEqual([...new Set('hello')], ___, 'a set of the letters, in order');
const a = new Set([1, 2, 3]);
const b = new Set([3, 4]);
assert.deepEqual(a.union(b), ___, 'union: in either');
assert.deepEqual(a.intersection(b), ___, 'intersection: in both');
assert.deepEqual(a.difference(b), ___, 'difference: in a but not in b');
