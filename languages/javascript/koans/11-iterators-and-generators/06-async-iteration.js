// title: Async iteration
// intro: An `async function*` yields values that may come later. `for await…of` waits for each one in turn, and `Array.fromAsync` collects them all.
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function* ticks(n) {
  for (let i = 1; i <= n; i++) {
    await wait(1);
    yield i;
  }
}
const seen = [];
for await (const t of ticks(3)) seen.push(t);
expect(seen, 'for await takes them one by one').toEqual(___);
await expect(Array.fromAsync(ticks(2)), 'Array.fromAsync collects them').resolves.toEqual(___);
const sums = [];
for await (const n of [Promise.resolve(10), 20]) sums.push(n);
expect(sums, 'for await also awaits promises in a plain array').toEqual(___);
const it = ticks(1);
expect(it.next(), 'an async iterator gives promises').toBeInstanceOf(___);
