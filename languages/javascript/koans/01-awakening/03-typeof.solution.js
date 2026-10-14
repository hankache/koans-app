assert.equal(typeof 42, 'number', 'integers and fractions are both numbers');
assert.equal(typeof 'hi', 'string', 'quotes make a string');
assert.equal(typeof true, 'boolean', 'true and false');
assert.equal(typeof undefined, 'undefined', 'the value of nothing assigned');
assert.equal(typeof null, 'object', 'the famous mistake');
assert.equal(typeof [], 'object', 'arrays are objects');
assert.equal(Array.isArray([]), true, 'so ask Array.isArray instead');
assert.equal(typeof (() => 1), 'function', 'functions get their own answer');
