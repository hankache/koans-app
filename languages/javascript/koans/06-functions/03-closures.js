// title: Closures
// intro: A function keeps the variables it was made with, even after the code that made them has finished. Each call of the outer function makes a fresh set.
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next();
assert.equal(next(), ___, 'the inner function keeps its count between calls');
const other = counter();
assert.equal(other(), ___, 'each counter has its own count');
const adders = [1, 2, 3].map(n => x => x + n);
assert.equal(adders[2](10), ___, 'each adder remembers its own n');
