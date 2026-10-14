// title: Arrays and tuples
// intro: `T[]` is an array of any length. A tuple `[A, B]` has a fixed length, with a type for each position.
const scores: number[] = [90, 85];
assert.type<___>(scores, 'an array of numbers');
const pair: [string, number] = ['Ada', 36];
assert.type<___>(pair, 'a tuple fixes the length and each type');
assert.type<___>(pair[1], 'each position has its own type');
const [who] = pair;
assert.type<___>(who, 'destructuring keeps them');
assert.equal(pair.length, ___, 'a tuple is an array when the code runs');
const names: readonly string[] = ['Ada'];
assert.typeEqual<typeof names, ___>('readonly arrays cannot be changed');
