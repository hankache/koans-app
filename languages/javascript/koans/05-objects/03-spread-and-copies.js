// title: Spread and copies
// intro: Spreading an object with `...` copies its properties into a new one, but only one level deep. `structuredClone` copies all the way down, and `?.` reads a property only if there is something to read it from.
const base = { a: 1, b: 2 };
assert.deepEqual({ ...base, b: 3 }, ___, 'later properties win');
assert.equal(base.b, ___, 'and the original is left alone');
const original = { list: [1] };
const copy = { ...original };
copy.list.push(2);
assert.deepEqual(original.list, ___, 'spread copies one level: both share the list');
const deep = structuredClone(original);
deep.list.push(3);
assert.deepEqual(original.list, ___, 'structuredClone copies all the way down');
assert.equal(original.missing?.value, ___, '?. stops at a missing property instead of throwing');
