assert.deepEqual('a,b,c'.split(','), ['a', 'b', 'c'], 'split at commas');
assert.equal(['x', 'y', 'z'].join('-'), 'x-y-z', 'join with a dash');
assert.equal('ab'.repeat(3), 'ababab', 'repeat a string');
assert.equal('5'.padStart(3, '0'), '005', 'pad it to a width');
assert.deepEqual([...'hi'], ['h', 'i'], 'spread a string into its characters');
