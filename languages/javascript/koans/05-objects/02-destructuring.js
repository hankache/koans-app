// title: Destructuring
// intro: Destructuring takes values out of objects and arrays into variables in one step, with defaults for what's missing, and `...` for the rest.
const { name, age = 0 } = { name: 'Ada' };
assert.equal(name, ___, 'take a property by its name');
assert.equal(age, ___, 'with a default when it is missing');
const [first, , third] = [1, 2, 3];
assert.equal(third, ___, 'take array items by position, skipping some');
const [head, ...tail] = [1, 2, 3];
assert.deepEqual(tail, ___, '...tail takes the rest');
let a = 1;
let b = 2;
[a, b] = [b, a];
assert.equal(a, ___, 'swapping two values needs no temporary');
