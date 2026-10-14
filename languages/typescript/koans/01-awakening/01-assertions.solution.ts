assert.equal(1 + 1, 2, 'assert.equal compares values, as in JavaScript');
const greeting: string = 'hello';
assert.type<string>(greeting, 'an annotation gives a variable its type');
const count: number = 3;
assert.type<number>(count, 'integers and fractions share one type');
assert.typeEqual<boolean, true | false>('boolean is just true | false');
assert.equal(greeting.length, 5, 'types disappear when the code runs; values remain');
