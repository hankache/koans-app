// title: Split, join and repeat
// intro: `split()` cuts a string into an array and `join()` glues an array back into a string. Spreading a string with `...` gives its characters.
assert.deepEqual('a,b,c'.split(','), ___, 'split at commas');
assert.equal(['x', 'y', 'z'].join('-'), ___, 'join with a dash');
assert.equal('ab'.repeat(3), ___, 'repeat a string');
assert.equal('5'.padStart(3, '0'), ___, 'pad it to a width');
assert.deepEqual([...'hi'], ___, 'spread a string into its characters');
