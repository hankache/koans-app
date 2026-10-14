expect(typeof 42, 'integers and fractions are both numbers').toBe('number');
expect(typeof 'hi', 'quotes make a string').toBe('string');
expect(typeof true, 'true and false').toBe('boolean');
expect(typeof undefined, 'the value of nothing assigned').toBe('undefined');
expect(typeof null, 'the famous mistake').toBe('object');
expect(typeof [], 'arrays are objects').toBe('object');
expect(Array.isArray([]), 'so ask Array.isArray instead').toBe(true);
expect(typeof (() => 1), 'functions get their own answer').toBe('function');
