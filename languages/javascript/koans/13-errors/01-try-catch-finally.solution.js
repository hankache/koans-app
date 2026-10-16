const log = [];
try {
  log.push('try');
  null.x;
} catch (error) {
  log.push(error.constructor.name);
} finally {
  log.push('finally');
}
expect(log, 'catch, then finally').toEqual(['try', 'TypeError', 'finally']);
function early() {
  try {
    return 'from try';
  } finally {
    log.push('cleanup');
  }
}
expect(early(), 'finally runs even after a return').toBe('from try');
expect(log.at(-1), 'and here is its trace').toBe('cleanup');
