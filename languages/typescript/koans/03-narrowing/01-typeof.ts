// title: typeof
// intro: Inside `if (typeof x === 'string')`, TypeScript knows `x` is a string; after the `if` returns, it knows `x` is whatever is left.
function describe(x: string | number): string {
  if (typeof x === 'string') {
    assert.type<___>(x, 'inside the if, x is a string');
    return x.toUpperCase();
  }
  assert.type<___>(x, 'after it, only number is left');
  return x.toFixed(1);
}
assert.equal(describe('hi'), ___, 'string methods for strings');
assert.equal(describe(2.5), ___, 'number methods for numbers');
