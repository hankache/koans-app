// title: Custom iterables
// intro: A class becomes iterable by defining `[Symbol.iterator]`, often as a generator method. Then `for…of`, spreading and destructuring all work on it.
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  *[Symbol.iterator]() {
    for (let n = this.start; n <= this.end; n++) yield n;
  }
}
expect([...new Range(1, 4)], 'spreading a custom iterable').toEqual(___);
const [first, second] = new Range(5, 9);
expect(second, 'destructuring works too').toBe(___);
expect(Array.from(new Range(1, 3), n => n * n), 'and Array.from').toEqual(___);
