// title: Hoisting
// intro: A function declaration can be called before the line that declares it. A `let` or `const` can't be used before its declaration: in between is its temporal dead zone.
expect(early(), 'a function declaration is hoisted').toBe(___);
function early() {
  return 'ready';
}
expect(() => { value; let value = 1; }, 'let has a temporal dead zone').toThrow(___);
expect(typeof later, 'typeof does not complain about undeclared names').toBe(___);
