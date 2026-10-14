// title: Promises
// intro: A promise stands for a value that comes later. `then` runs when it's ready and returns a new promise, so steps can be chained. `.resolves` checks what a promise resolves to.
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
await expect(wait(5, 'done'), '.resolves checks the value').resolves.toBe(___);
await expect(Promise.resolve(2).then(n => n * 10), 'then transforms it').resolves.toBe(___);
await expect(Promise.resolve(1).then(n => n + 1).then(n => n * 3), 'and chains').resolves.toBe(___);
expect(wait(1), 'a promise is an object').toBeInstanceOf(___);
