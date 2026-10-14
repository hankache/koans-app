async function fetchCount() {
  return 3;
}
expectTypeOf(fetchCount).returns.toEqualTypeOf<Promise<number>>(); // async wraps the result
expectTypeOf(fetchCount()).resolves.toEqualTypeOf<number>(); // .resolves unwraps it
expect(await fetchCount(), 'await gives the value').toBe(3);
try {
  JSON.parse('{oops');
} catch (error) {
  expectTypeOf(error).toEqualTypeOf<unknown>(); // anything can be thrown
  expect(error instanceof SyntaxError ? error.name : 'other', 'check before use').toBe('SyntaxError');
}
