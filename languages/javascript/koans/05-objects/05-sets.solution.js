const s = new Set([1, 1, 2, 3]);
assert.equal(s.size, 3, 'duplicates collapse');
assert.equal(s.has(2), true, 'has asks for a value');
assert.deepEqual([...new Set('hello')], ['h', 'e', 'l', 'o'], 'a set of the letters, in order');
const a = new Set([1, 2, 3]);
const b = new Set([3, 4]);
assert.deepEqual(a.union(b), new Set([1, 2, 3, 4]), 'union: in either');
assert.deepEqual(a.intersection(b), new Set([3]), 'intersection: in both');
assert.deepEqual(a.difference(b), new Set([1, 2]), 'difference: in a but not in b');
