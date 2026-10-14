// title: Truthiness and equality
// intro: Checking that a value is truthy rules out `undefined` and `null`. Comparing two values with `===` narrows both to the types they share.
function size(s?: string): number {
  if (s) {
    assert.type<___>(s, 'truthiness rules out undefined');
    return s.length;
  }
  return 0;
}
assert.equal(size('abc'), ___, 'a string has a length');
assert.equal(size(), ___, 'nothing has none');
function same(a: string | number, b: string | boolean): boolean {
  if (a === b) {
    assert.type<___>(a, '=== narrows both sides to what they share');
    return true;
  }
  return false;
}
assert.equal(same('x', 'x'), ___, 'equal strings');
