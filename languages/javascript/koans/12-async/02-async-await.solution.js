const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));
async function twice(n) {
  return n * 2;
}
expect(twice(2), 'an async function returns a promise').toBeInstanceOf(Promise);
expect(await twice(2), 'await unwraps it').toBe(4);
async function steps() {
  const a = await wait(5, 1);
  const b = await wait(5, 2);
  return a + b;
}
expect(await steps(), 'awaits run one after another').toBe(3);
