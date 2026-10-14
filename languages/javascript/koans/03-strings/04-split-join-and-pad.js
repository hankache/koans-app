// title: Split, join and pad
// intro: `split()` cuts a string into an array and `join()` glues an array back into a string. `padStart` and `padEnd` fill a string to a width.
expect('a,b,c'.split(','), 'split at commas').toEqual(___);
expect('a,b,c'.split(',', 2), 'at most two pieces').toEqual(___);
expect(['x', 'y', 'z'].join('-'), 'join with a dash').toBe(___);
expect('ab'.repeat(3), 'repeat a string').toBe(___);
expect('5'.padStart(3, '0'), 'pad on the left').toBe(___);
expect('ok'.padEnd(4, '.'), 'or on the right').toBe(___);
