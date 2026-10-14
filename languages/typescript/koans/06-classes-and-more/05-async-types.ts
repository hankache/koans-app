// title: Async types
// intro: An `async` function returns a `Promise` of its result. `await` unwraps it, and so does the `Awaited` type.
async function loadUser(id: number) {
  return { id, name: 'Ada' };
}
assert.typeEqual<ReturnType<typeof loadUser>, ___>('an async function returns a promise');
const user = await loadUser(1);
assert.type<___>(user, 'await unwraps it');
assert.equal(user.name, ___, 'and the value arrives');
const both = await Promise.all([loadUser(2), Promise.resolve(42)]);
assert.type<___>(both, 'Promise.all keeps each type');
assert.typeEqual<Awaited<ReturnType<typeof loadUser>>, ___>('Awaited unwraps a promise type');
await assert.rejects(Promise.reject(new TypeError('no')), ___, 'assert.rejects works as in JavaScript');
