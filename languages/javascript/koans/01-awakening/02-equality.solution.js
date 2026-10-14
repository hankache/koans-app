assert.equal('1' == 1, true, '== converts the string to a number');
assert.equal('1' === 1, false, '=== does not convert');
assert.equal(null == undefined, true, 'null and undefined are loosely equal');
assert.equal(null === undefined, false, 'but not strictly');
assert.equal(NaN === NaN, false, 'NaN is not equal to anything, even itself');
assert.equal(Object.is(NaN, NaN), true, 'Object.is says it is');
assert.equal([1] === [1], false, 'two arrays are two different objects');
