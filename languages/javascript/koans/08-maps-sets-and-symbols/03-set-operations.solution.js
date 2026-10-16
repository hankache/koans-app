const a = new Set([1, 2, 3]);
const b = new Set([3, 4]);
expect(a.union(b), 'union: in either').toEqual(new Set([1, 2, 3, 4]));
expect(a.intersection(b), 'intersection: in both').toEqual(new Set([3]));
expect(a.difference(b), 'difference: in a but not in b').toEqual(new Set([1, 2]));
expect(a.symmetricDifference(b), 'in one but not both').toEqual(new Set([1, 2, 4]));
expect(new Set([1, 2]).isSubsetOf(a), 'isSubsetOf').toBe(true);
