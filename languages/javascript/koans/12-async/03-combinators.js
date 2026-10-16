// title: Promise combinators
// intro: `Promise.all` waits for every promise, `allSettled` reports on each, `race` takes the first to finish, and `any` the first to succeed.
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
expect(await Promise.all([wait(10, 'a'), wait(5, 'b')]), 'all keeps the order it was given').toEqual(___);
expect(await Promise.race([wait(30, 'slow'), wait(5, 'fast')]), 'race takes the first to finish').toBe(___);
expect(await Promise.any([Promise.reject(new Error('x')), wait(5, 'ok')]), 'any takes the first success').toBe(___);
const results = await Promise.allSettled([Promise.resolve(1), Promise.reject('no')]);
expect(results.map(r => r.status), 'allSettled reports on each').toEqual(___);
