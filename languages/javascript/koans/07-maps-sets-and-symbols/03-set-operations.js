// title: Set operations
// intro: Sets have the operations of set theory: `union`, `intersection`, `difference`, `symmetricDifference`, and `isSubsetOf`.
const a = new Set([1, 2, 3]);
const b = new Set([3, 4]);
expect(a.union(b), 'union: in either').toEqual(___);
expect(a.intersection(b), 'intersection: in both').toEqual(___);
expect(a.difference(b), 'difference: in a but not in b').toEqual(___);
expect(a.symmetricDifference(b), 'in one but not both').toEqual(___);
expect(new Set([1, 2]).isSubsetOf(a), 'isSubsetOf').toBe(___);
