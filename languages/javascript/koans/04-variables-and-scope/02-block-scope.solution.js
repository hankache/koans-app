function withVar() {
  if (true) {
    var x = 'var';
  }
  return x;
}
expect(withVar(), 'var belongs to the whole function').toBe('var');
{
  let inner = 'block';
}
expect(typeof inner, 'let stays inside its block').toBe('undefined');
const callbacks = [];
for (let i = 0; i < 3; i++) {
  callbacks.push(() => i);
}
expect(callbacks.map(f => f()), 'each loop round has its own i').toEqual([0, 1, 2]);
