// title: Arrays
// intro: An array holds values in order. `push` and `pop` work at its end, and `includes` and `indexOf` look for a value.
const a = [3, 1, 2];
a.push(4);
assert.deepEqual(a, ___, 'push adds to the end');
assert.equal(a.length, ___, 'length counts the items');
assert.equal(a.pop(), ___, 'pop removes and returns the last item');
assert.equal(a.includes(1), ___, 'includes looks for a value');
assert.equal(a.indexOf(2), ___, 'indexOf says where it is');
assert.equal(a[a.length - 1], ___, 'the last item, the old way');
