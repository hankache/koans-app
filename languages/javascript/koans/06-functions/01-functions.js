// title: Functions
// intro: A function can give its parameters defaults and gather any number of arguments with `...`. One that returns nothing returns `undefined`.
function greet(name = 'world') {
  return `Hello, ${name}!`;
}
assert.equal(greet(), ___, 'a default fills in a missing argument');
assert.equal(greet('Ada'), ___, 'and steps aside for a given one');
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
assert.equal(sum(1, 2, 3), ___, '...nums gathers the arguments into an array');
assert.equal(sum(), ___, 'even when there are none');
function nothing() {}
assert.equal(nothing(), ___, 'a function without return returns undefined');
