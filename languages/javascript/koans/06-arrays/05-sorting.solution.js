expect([10, 1, 2].sort(), 'sort compares as strings by default').toEqual([1, 10, 2]);
expect([10, 1, 2].sort((a, b) => a - b), 'a comparison function sorts numbers').toEqual([1, 2, 10]);
const original = [3, 1, 2];
expect(original.toSorted(), 'toSorted returns a sorted copy').toEqual([1, 2, 3]);
expect(original, 'and leaves the array alone').toEqual([3, 1, 2]);
expect([1, 2, 3].toReversed(), 'toReversed returns a reversed copy').toEqual([3, 2, 1]);
const byAge = [{ n: 'b', age: 2 }, { n: 'a', age: 2 }, { n: 'c', age: 1 }].sort((x, y) => x.age - y.age);
expect(byAge.map(p => p.n), 'sort is stable: ties keep their order').toEqual(['c', 'b', 'a']);
