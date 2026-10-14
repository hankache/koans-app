const value: unknown = 'text';
assert.type<unknown>(value, 'unknown accepts any value');
assert.equal(typeof value === 'string' ? value.length : 0, 4, 'and must be checked before use');
function fail(message: string): never {
  throw new Error(message);
}
assert.typeEqual<ReturnType<typeof fail>, never>('a function that never returns');
assert.throws(() => fail('stop'), Error, 'it throws instead');
assert.typeEqual<string | never, string>('never disappears from a union');
