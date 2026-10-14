function describe(x: string | number): string {
  if (typeof x === 'string') {
    assert.type<string>(x, 'inside the if, x is a string');
    return x.toUpperCase();
  }
  assert.type<number>(x, 'after it, only number is left');
  return x.toFixed(1);
}
assert.equal(describe('hi'), 'HI', 'string methods for strings');
assert.equal(describe(2.5), '2.5', 'number methods for numbers');
