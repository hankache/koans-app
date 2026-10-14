// title: Overloads
// intro: Several signatures before one implementation describe a function whose result type depends on its arguments. Each call picks the first signature that fits.
function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number): string | number {
  return typeof x === 'string' ? Number(x) : String(x);
}
assert.type<___>(parse('42'), 'a string in, a number out');
assert.type<___>(parse(42), 'a number in, a string out');
assert.equal(parse('42'), ___, 'one implementation does both');
assert.equal(parse(42), ___, 'as the signatures promise');
