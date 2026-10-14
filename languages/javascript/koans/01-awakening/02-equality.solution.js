expect('1' == 1, '== converts the string to a number').toBe(true);
expect('1' === 1, '=== does not convert').toBe(false);
expect(null == undefined, 'null and undefined are loosely equal').toBe(true);
expect(null === undefined, 'but not strictly').toBe(false);
expect(NaN === NaN, 'NaN is not equal to anything, even itself').toBe(false);
expect(Object.is(NaN, NaN), 'Object.is says it is').toBe(true);
expect([1] === [1], 'two arrays are two different objects').toBe(false);
