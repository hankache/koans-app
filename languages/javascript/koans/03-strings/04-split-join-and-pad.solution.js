expect('a,b,c'.split(','), 'split at commas').toEqual(['a', 'b', 'c']);
expect('a,b,c'.split(',', 2), 'at most two pieces').toEqual(['a', 'b']);
expect(['x', 'y', 'z'].join('-'), 'join with a dash').toBe('x-y-z');
expect('ab'.repeat(3), 'repeat a string').toBe('ababab');
expect('5'.padStart(3, '0'), 'pad on the left').toBe('005');
expect('ok'.padEnd(4, '.'), 'or on the right').toBe('ok..');
