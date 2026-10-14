// title: Higher-order functions
// intro: A function that takes or returns functions can build new behaviour out of old: composing, currying, or wrapping.
const compose = (f, g) => x => f(g(x));
const inc = n => n + 1;
const double = n => n * 2;
expect(compose(inc, double)(5), 'compose runs right to left').toBe(___);
const curry = a => b => a + b;
expect(curry(1)(2), 'a curried function takes one argument at a time').toBe(___);
const calls = [];
const logged = fn => (...args) => (calls.push(args), fn(...args));
logged(Math.max)(1, 5);
expect(calls, 'a wrapper can watch the calls').toEqual(___);
