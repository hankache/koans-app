// title: Sorting
// intro: `sort` sorts the array itself, comparing items as strings unless you give it a comparison function. `toSorted` and `toReversed` return sorted copies.
expect([10, 1, 2].sort(), 'sort compares as strings by default').toEqual(___);
expect([10, 1, 2].sort((a, b) => a - b), 'a comparison function sorts numbers').toEqual(___);
const original = [3, 1, 2];
expect(original.toSorted(), 'toSorted returns a sorted copy').toEqual(___);
expect(original, 'and leaves the array alone').toEqual(___);
expect([1, 2, 3].toReversed(), 'toReversed returns a reversed copy').toEqual(___);
const byAge = [{ n: 'b', age: 2 }, { n: 'a', age: 2 }, { n: 'c', age: 1 }].sort((x, y) => x.age - y.age);
expect(byAge.map(p => p.n), 'sort is stable: ties keep their order').toEqual(___);
