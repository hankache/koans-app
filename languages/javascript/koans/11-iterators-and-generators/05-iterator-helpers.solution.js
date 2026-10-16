function* naturals() {
  let n = 1;
  while (true) yield n++;
}
expect(naturals().take(3).toArray(), 'take stops an endless iterator').toEqual([1, 2, 3]);
const squares = naturals().filter(n => n % 3 === 0).map(n => n * n);
expect(squares.take(2).toArray(), 'the steps run lazily, so this ends').toEqual([9, 36]);
expect(naturals().drop(5).take(1).toArray(), 'drop skips some').toEqual([6]);
expect(Iterator.from('abc').map(c => c.toUpperCase()).toArray(), 'Iterator.from wraps an iterable').toEqual(['A', 'B', 'C']);
expect(naturals().some(n => n > 10), 'some stops at the first match').toBe(true);
expect([1, 2, 3].values().reduce((a, b) => a + b), 'and reduce works too').toBe(6);
