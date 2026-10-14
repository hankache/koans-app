function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number): string | number {
  return typeof x === 'string' ? Number(x) : String(x);
}
assert.type<number>(parse('42'), 'a string in, a number out');
assert.type<string>(parse(42), 'a number in, a string out');
assert.equal(parse('42'), 42, 'one implementation does both');
assert.equal(parse(42), '42', 'as the signatures promise');
