class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  *[Symbol.iterator]() {
    for (let n = this.start; n <= this.end; n++) yield n;
  }
}
expect([...new Range(1, 4)], 'spreading a custom iterable').toEqual([1, 2, 3, 4]);
const [first, second] = new Range(5, 9);
expect(second, 'destructuring works too').toBe(6);
expect(Array.from(new Range(1, 3), n => n * n), 'and Array.from').toEqual([1, 4, 9]);
