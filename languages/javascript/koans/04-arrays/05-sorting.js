// title: Sorting
// intro: `sort` sorts the array itself, comparing items as strings unless you give it a comparison function. `toSorted` and `toReversed` return sorted copies.
assert.deepEqual([10, 1, 2].sort(), ___, 'sort compares as strings by default');
assert.deepEqual([10, 1, 2].sort((a, b) => a - b), ___, 'a comparison function sorts numbers');
const original = [3, 1, 2];
const sorted = original.toSorted();
assert.deepEqual(sorted, ___, 'toSorted returns a sorted copy');
assert.deepEqual(original, ___, 'and leaves the array alone');
assert.deepEqual(['b', 'a', 'C'].sort(), ___, 'capitals sort first');
assert.deepEqual([1, 2, 3].toReversed(), ___, 'toReversed returns a reversed copy');
