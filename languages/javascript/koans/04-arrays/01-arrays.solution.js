const a = [3, 1, 2];
a.push(4);
assert.deepEqual(a, [3, 1, 2, 4], 'push adds to the end');
assert.equal(a.length, 4, 'length counts the items');
assert.equal(a.pop(), 4, 'pop removes and returns the last item');
assert.equal(a.includes(1), true, 'includes looks for a value');
assert.equal(a.indexOf(2), 2, 'indexOf says where it is');
assert.equal(a[a.length - 1], 2, 'the last item, the old way');
