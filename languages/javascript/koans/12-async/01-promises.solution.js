const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
await expect(wait(5, 'done'), '.resolves checks the value').resolves.toBe('done');
await expect(Promise.resolve(2).then(n => n * 10), 'then transforms it').resolves.toBe(20);
await expect(Promise.resolve(1).then(n => n + 1).then(n => n * 3), 'and chains').resolves.toBe(6);
expect(wait(1), 'a promise is an object').toBeInstanceOf(Promise);
