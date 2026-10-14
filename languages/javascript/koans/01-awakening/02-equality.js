// title: Equality
// intro: `===` compares without converting anything; `==` converts types first, with rules few people remember. `assert.equal` uses `Object.is`, which is `===` except that `NaN` equals itself.
assert.equal('1' == 1, ___, '== converts the string to a number');
assert.equal('1' === 1, ___, '=== does not convert');
assert.equal(null == undefined, ___, 'null and undefined are loosely equal');
assert.equal(null === undefined, ___, 'but not strictly');
assert.equal(NaN === NaN, ___, 'NaN is not equal to anything, even itself');
assert.equal(Object.is(NaN, NaN), ___, 'Object.is says it is');
assert.equal([1] === [1], ___, 'two arrays are two different objects');
