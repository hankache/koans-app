// title: typeof
// intro: `typeof` names a value's type as a string. It has one famous mistake, kept for compatibility, so arrays and `null` need other tests.
expect(typeof 42, 'integers and fractions are both numbers').toBe(___);
expect(typeof 'hi', 'quotes make a string').toBe(___);
expect(typeof true, 'true and false').toBe(___);
expect(typeof undefined, 'the value of nothing assigned').toBe(___);
expect(typeof null, 'the famous mistake').toBe(___);
expect(typeof [], 'arrays are objects').toBe(___);
expect(Array.isArray([]), 'so ask Array.isArray instead').toBe(___);
expect(typeof (() => 1), 'functions get their own answer').toBe(___);
