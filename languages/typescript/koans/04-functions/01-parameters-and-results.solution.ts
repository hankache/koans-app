function add(a: number, b: number): number {
  return a + b;
}
assert.equal(add(2, 3), 5, 'a typed function');
assert.typeEqual<ReturnType<typeof add>, number>('ReturnType reads its result type');
assert.typeEqual<Parameters<typeof add>, [a: number, b: number]>('Parameters reads its parameters, as a tuple');
const shout = (s: string) => s.toUpperCase() + '!';
assert.type<string>(shout('hi'), 'the result type is inferred');
function nothing(): void {}
assert.typeEqual<ReturnType<typeof nothing>, void>('void: no result to use');
