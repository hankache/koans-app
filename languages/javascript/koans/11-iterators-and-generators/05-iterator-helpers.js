// title: Iterator helpers
// intro: Iterators have their own `map`, `filter`, `take` and `drop`, which work lazily, one value at a time, and `toArray` to collect. `Iterator.from` wraps any iterable.
function* naturals() {
  let n = 1;
  while (true) yield n++;
}
expect(naturals().take(3).toArray(), 'take stops an endless iterator').toEqual(___);
const squares = naturals().filter(n => n % 3 === 0).map(n => n * n);
expect(squares.take(2).toArray(), 'the steps run lazily, so this ends').toEqual(___);
expect(naturals().drop(5).take(1).toArray(), 'drop skips some').toEqual(___);
expect(Iterator.from('abc').map(c => c.toUpperCase()).toArray(), 'Iterator.from wraps an iterable').toEqual(___);
expect(naturals().some(n => n > 10), 'some stops at the first match').toBe(___);
expect([1, 2, 3].values().reduce((a, b) => a + b), 'and reduce works too').toBe(___);
