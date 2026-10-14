function size(s?: string): number {
  if (s) {
    assert.type<string>(s, 'truthiness rules out undefined');
    return s.length;
  }
  return 0;
}
assert.equal(size('abc'), 3, 'a string has a length');
assert.equal(size(), 0, 'nothing has none');
function same(a: string | number, b: string | boolean): boolean {
  if (a === b) {
    assert.type<string>(a, '=== narrows both sides to what they share');
    return true;
  }
  return false;
}
assert.equal(same('x', 'x'), true, 'equal strings');
