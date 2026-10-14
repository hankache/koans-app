// title: Parameters and results
// intro: Parameters need types; results are usually inferred. `ReturnType` and `Parameters` read them back from a function's type.
function add(a: number, b: number): number {
  return a + b;
}
assert.equal(add(2, 3), ___, 'a typed function');
assert.typeEqual<ReturnType<typeof add>, ___>('ReturnType reads its result type');
assert.typeEqual<Parameters<typeof add>, ___>('Parameters reads its parameters, as a tuple');
const shout = (s: string) => s.toUpperCase() + '!';
assert.type<___>(shout('hi'), 'the result type is inferred');
function nothing(): void {}
assert.typeEqual<ReturnType<typeof nothing>, ___>('void: no result to use');
