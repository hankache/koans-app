const a = [1, 2, 3, 4, 5];
assert.deepEqual(a.slice(1, 3), [2, 3], 'slice copies a part');
assert.deepEqual(a, [1, 2, 3, 4, 5], 'and leaves the array alone');
const removed = a.splice(1, 2);
assert.deepEqual(removed, [2, 3], 'splice cuts items out');
assert.deepEqual(a, [1, 4, 5], 'of the array itself');
assert.deepEqual([...a, 6], [1, 4, 5, 6], 'spreading copies into a new array');
