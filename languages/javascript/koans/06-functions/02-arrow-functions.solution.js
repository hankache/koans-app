const double = n => n * 2;
assert.equal(double(4), 8, 'one parameter needs no parentheses');
const add = (a, b) => a + b;
assert.equal(add(2, 3), 5, 'more than one does');
const point = (x, y) => ({ x, y });
assert.deepEqual(point(1, 2), { x: 1, y: 2 }, 'parentheses make the braces an object, not a body');
assert.deepEqual([1, 2, 3].map(n => n * n), [1, 4, 9], 'arrows are handy as arguments');
const apply = (f, x) => f(x);
assert.equal(apply(double, 5), 10, 'functions are values like any other');
