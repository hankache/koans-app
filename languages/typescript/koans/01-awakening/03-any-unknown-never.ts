// title: any, unknown and never
// intro: `any` switches type checking off. `unknown` accepts anything too, but must be checked before it's used. `never` is the type with no values at all.
const value: unknown = 'text';
assert.type<___>(value, 'unknown accepts any value');
assert.equal(typeof value === 'string' ? value.length : 0, ___, 'and must be checked before use');
function fail(message: string): never {
  throw new Error(message);
}
assert.typeEqual<ReturnType<typeof fail>, ___>('a function that never returns');
assert.throws(() => fail('stop'), ___, 'it throws instead');
assert.typeEqual<string | never, ___>('never disappears from a union');
