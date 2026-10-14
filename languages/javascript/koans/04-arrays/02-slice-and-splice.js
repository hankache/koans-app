// title: Slice and splice
// intro: `slice` copies part of an array and leaves it alone; `splice` cuts items out of the array itself. Spreading with `...` copies an array into a new one.
const a = [1, 2, 3, 4, 5];
assert.deepEqual(a.slice(1, 3), ___, 'slice copies a part');
assert.deepEqual(a, ___, 'and leaves the array alone');
const removed = a.splice(1, 2);
assert.deepEqual(removed, ___, 'splice cuts items out');
assert.deepEqual(a, ___, 'of the array itself');
assert.deepEqual([...a, 6], ___, 'spreading copies into a new array');
