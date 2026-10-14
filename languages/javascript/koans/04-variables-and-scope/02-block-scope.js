// title: Block scope
// intro: `let` and `const` live in the block they're declared in. `var`, the old way, belongs to the whole function, wherever it's declared.
function withVar() {
  if (true) {
    var x = 'var';
  }
  return x;
}
expect(withVar(), 'var belongs to the whole function').toBe(___);
{
  let inner = 'block';
}
expect(typeof inner, 'let stays inside its block').toBe(___);
const callbacks = [];
for (let i = 0; i < 3; i++) {
  callbacks.push(() => i);
}
expect(callbacks.map(f => f()), 'each loop round has its own i').toEqual(___);
