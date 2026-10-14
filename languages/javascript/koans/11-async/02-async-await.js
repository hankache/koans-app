// title: async and await
// intro: An `async` function always returns a promise, and inside one `await` waits for a promise and gives its value.
const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
async function twice(n) {
  return n * 2;
}
expect(twice(2), 'an async function returns a promise').toBeInstanceOf(___);
expect(await twice(2), 'await unwraps it').toBe(___);
async function steps() {
  const a = await wait(5, 1);
  const b = await wait(5, 2);
  return a + b;
}
expect(await steps(), 'awaits run one after another').toBe(___);
