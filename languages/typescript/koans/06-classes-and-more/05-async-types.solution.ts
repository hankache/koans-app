async function loadUser(id: number) {
  return { id, name: 'Ada' };
}
assert.typeEqual<ReturnType<typeof loadUser>, Promise<{ id: number; name: string }>>('an async function returns a promise');
const user = await loadUser(1);
assert.type<{ id: number; name: string }>(user, 'await unwraps it');
assert.equal(user.name, 'Ada', 'and the value arrives');
const both = await Promise.all([loadUser(2), Promise.resolve(42)]);
assert.type<[{ id: number; name: string }, number]>(both, 'Promise.all keeps each type');
assert.typeEqual<Awaited<ReturnType<typeof loadUser>>, { id: number; name: string }>('Awaited unwraps a promise type');
await assert.rejects(Promise.reject(new TypeError('no')), TypeError, 'assert.rejects works as in JavaScript');
