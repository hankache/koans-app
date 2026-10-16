// title: Closures
// intro: A function keeps the variables it was made with, even after the code that made them has finished. Each call of the outer function makes a fresh set.
function counter() {
  let count = 0;
  return () => ++count;
}
const next = counter();
next();
expect(next(), 'the inner function keeps its count').toBe(___);
const other = counter();
expect(other(), 'each counter has its own').toBe(___);
const adders = [1, 2, 3].map(n => x => x + n);
expect(adders[2](10), 'each adder remembers its own n').toBe(___);
function once(fn) {
  let done = false;
  return () => (done ? undefined : ((done = true), fn()));
}
const init = once(() => 'ran');
init();
expect(init(), 'a closure can remember that something happened').toBe(___);
