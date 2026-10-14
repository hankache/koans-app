function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next();
assert.equal(next(), 2, 'the inner function keeps its count between calls');
const other = counter();
assert.equal(other(), 1, 'each counter has its own count');
const adders = [1, 2, 3].map(n => x => x + n);
assert.equal(adders[2](10), 13, 'each adder remembers its own n');
