expect(early(), 'a function declaration is hoisted').toBe('ready');
function early() {
  return 'ready';
}
expect(() => { value; let value = 1; }, 'let has a temporal dead zone').toThrow(ReferenceError);
expect(typeof later, 'typeof does not complain about undeclared names').toBe('undefined');
