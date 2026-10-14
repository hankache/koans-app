// title: Assertions
// intro: TypeScript koans use the JavaScript koans' `assert`, plus two assertions about types: `assert.type<T>(value)` passes when the value's type is exactly `T`, and `assert.typeEqual<A, B>()` when two types are the same. A `___` can stand for a value or for a type.
assert.equal(1 + 1, ___, 'assert.equal compares values, as in JavaScript');
const greeting: string = 'hello';
assert.type<___>(greeting, 'an annotation gives a variable its type');
const count: number = 3;
assert.type<___>(count, 'integers and fractions share one type');
assert.typeEqual<boolean, ___>('boolean is just true | false');
assert.equal(greeting.length, ___, 'types disappear when the code runs; values remain');
