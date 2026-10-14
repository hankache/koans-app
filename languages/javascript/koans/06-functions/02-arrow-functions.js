// title: Arrow functions
// intro: `=>` makes a short function. With an expression after the arrow, it returns that expression; to return an object, put it in parentheses.
const double = n => n * 2;
assert.equal(double(4), ___, 'one parameter needs no parentheses');
const add = (a, b) => a + b;
assert.equal(add(2, 3), ___, 'more than one does');
const point = (x, y) => ({ x, y });
assert.deepEqual(point(1, 2), ___, 'parentheses make the braces an object, not a body');
assert.deepEqual([1, 2, 3].map(n => n * n), ___, 'arrows are handy as arguments');
const apply = (f, x) => f(x);
assert.equal(apply(double, 5), ___, 'functions are values like any other');
