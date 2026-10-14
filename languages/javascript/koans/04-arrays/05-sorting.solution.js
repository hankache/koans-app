assert.deepEqual([10, 1, 2].sort(), [1, 10, 2], 'sort compares as strings by default');
assert.deepEqual([10, 1, 2].sort((a, b) => a - b), [1, 2, 10], 'a comparison function sorts numbers');
const original = [3, 1, 2];
const sorted = original.toSorted();
assert.deepEqual(sorted, [1, 2, 3], 'toSorted returns a sorted copy');
assert.deepEqual(original, [3, 1, 2], 'and leaves the array alone');
assert.deepEqual(['b', 'a', 'C'].sort(), ['C', 'a', 'b'], 'capitals sort first');
assert.deepEqual([1, 2, 3].toReversed(), [3, 2, 1], 'toReversed returns a reversed copy');
