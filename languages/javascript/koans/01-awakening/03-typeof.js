// title: typeof
// intro: `typeof` names a value's type as a string. It has one famous mistake, kept for compatibility, so arrays and `null` need other tests.
assert.equal(typeof 42, ___, 'integers and fractions are both numbers');
assert.equal(typeof 'hi', ___, 'quotes make a string');
assert.equal(typeof true, ___, 'true and false');
assert.equal(typeof undefined, ___, 'the value of nothing assigned');
assert.equal(typeof null, ___, 'the famous mistake');
assert.equal(typeof [], ___, 'arrays are objects');
assert.equal(Array.isArray([]), ___, 'so ask Array.isArray instead');
assert.equal(typeof (() => 1), ___, 'functions get their own answer');
