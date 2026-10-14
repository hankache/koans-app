// title: Inference
// intro: TypeScript infers the types you don't write. A `const` keeps a literal's exact value as its type; a `let` widens it, because it may change.
const name = 'Ada';
assert.type<___>(name, 'a const string has its exact value as its type');
let city = 'London';
assert.type<___>(city, 'a let widens to string');
const year = 1815;
assert.type<___>(year, 'numbers too');
const list = [1, 2, 3];
assert.type<___>(list, 'an array of numbers');
const mixed = [1, 'two'];
assert.type<___>(mixed, 'mixed items give an array of a union');
const point = { x: 1, y: 2 };
assert.type<___>(point, 'object properties widen, since they may change');
