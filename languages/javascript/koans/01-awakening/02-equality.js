// title: Equality
// intro: `===` compares without converting anything; `==` converts types first, with rules few people remember. `toBe` uses `Object.is`, which is `===` except that `NaN` equals itself.
expect('1' == 1, '== converts the string to a number').toBe(___);
expect('1' === 1, '=== does not convert').toBe(___);
expect(null == undefined, 'null and undefined are loosely equal').toBe(___);
expect(null === undefined, 'but not strictly').toBe(___);
expect(NaN === NaN, 'NaN is not equal to anything, even itself').toBe(___);
expect(Object.is(NaN, NaN), 'Object.is says it is').toBe(___);
expect([1] === [1], 'two arrays are two different objects').toBe(___);
