function* countdown(n) {
  while (n > 0) {
    yield n;
    n--;
  }
}
expect([...countdown(3)], 'a generator yields values one by one').toEqual([3, 2, 1]);
const gen = countdown(2);
expect(gen.next().value, 'it runs up to the first yield').toBe(2);
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
const firstThree = [];
for (const n of naturals()) {
  if (n > 3) break;
  firstThree.push(n);
}
expect(firstThree, 'a generator can go on for ever; take what you need').toEqual([1, 2, 3]);
