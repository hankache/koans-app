// title: Promises and async
// intro: A promise stands for a value that comes later. `await` waits for it; an `async` function always returns a promise. `Promise.all` waits for every promise, and `Promise.race` for the first.
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
assert.equal(await wait(10, 'done'), ___, 'await waits for the value');
async function twice(n) {
  return n * 2;
}
assert.equal(twice(2) instanceof Promise, ___, 'an async function returns a promise');
assert.equal(await twice(2), ___, 'and await unwraps it');
assert.deepEqual(await Promise.all([wait(10, 'a'), wait(5, 'b')]), ___, 'Promise.all keeps the order it was given');
assert.equal(await Promise.race([wait(30, 'slow'), wait(5, 'fast')]), ___, 'Promise.race takes the first to finish');
await assert.rejects(Promise.reject(new TypeError('bad')), ___, 'assert.rejects wants a promise to fail');
