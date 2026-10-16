const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
expect(await Promise.all([wait(10, 'a'), wait(5, 'b')]), 'all keeps the order it was given').toEqual(['a', 'b']);
expect(await Promise.race([wait(30, 'slow'), wait(5, 'fast')]), 'race takes the first to finish').toBe('fast');
expect(await Promise.any([Promise.reject(new Error('x')), wait(5, 'ok')]), 'any takes the first success').toBe('ok');
const results = await Promise.allSettled([Promise.resolve(1), Promise.reject('no')]);
expect(results.map(r => r.status), 'allSettled reports on each').toEqual(['fulfilled', 'rejected']);
