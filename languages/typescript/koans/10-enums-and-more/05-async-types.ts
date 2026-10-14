// title: Async types
// intro: An `async` function returns a `Promise` of its result. `.resolves` checks what it resolves to, and in a `catch`, the error is `unknown` until checked.
async function fetchCount() {
  return 3;
}
expectTypeOf(fetchCount).returns.toEqualTypeOf<___>(); // async wraps the result
expectTypeOf(fetchCount()).resolves.toEqualTypeOf<___>(); // .resolves unwraps it
expect(await fetchCount(), 'await gives the value').toBe(___);
try {
  JSON.parse('{oops');
} catch (error) {
  expectTypeOf(error).toEqualTypeOf<___>(); // anything can be thrown
  expect(error instanceof SyntaxError ? error.name : 'other', 'check before use').toBe(___);
}
