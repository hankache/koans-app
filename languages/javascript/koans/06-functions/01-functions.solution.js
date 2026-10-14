function greet(name = 'world') {
  return `Hello, ${name}!`;
}
assert.equal(greet(), 'Hello, world!', 'a default fills in a missing argument');
assert.equal(greet('Ada'), 'Hello, Ada!', 'and steps aside for a given one');
function sum(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
assert.equal(sum(1, 2, 3), 6, '...nums gathers the arguments into an array');
assert.equal(sum(), 0, 'even when there are none');
function nothing() {}
assert.equal(nothing(), undefined, 'a function without return returns undefined');
