// title: try, catch and finally
// intro: `catch` handles an error, and `finally` runs no matter what, even after a `return`.
const log = [];
try {
  log.push('try');
  null.x;
} catch (error) {
  log.push(error.constructor.name);
} finally {
  log.push('finally');
}
expect(log, 'catch, then finally').toEqual(___);
function early() {
  try {
    return 'from try';
  } finally {
    log.push('cleanup');
  }
}
expect(early(), 'finally runs even after a return').toBe(___);
expect(log.at(-1), 'and here is its trace').toBe(___);
