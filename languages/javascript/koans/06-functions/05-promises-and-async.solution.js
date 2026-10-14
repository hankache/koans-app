const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
assert.equal(await wait(10, 'done'), 'done', 'await waits for the value');
async function twice(n) {
  return n * 2;
}
assert.equal(twice(2) instanceof Promise, true, 'an async function returns a promise');
assert.equal(await twice(2), 4, 'and await unwraps it');
assert.deepEqual(await Promise.all([wait(10, 'a'), wait(5, 'b')]), ['a', 'b'], 'Promise.all keeps the order it was given');
assert.equal(await Promise.race([wait(30, 'slow'), wait(5, 'fast')]), 'fast', 'Promise.race takes the first to finish');
await assert.rejects(Promise.reject(new TypeError('bad')), TypeError, 'assert.rejects wants a promise to fail');
