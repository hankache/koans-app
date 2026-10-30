// title: void and never
// intro: `void` is the result of a function that returns nothing. `never` is the type with no values: the result of a function that never returns, and what is left when every case is ruled out.
function log(message: string) {
  console.info(message);
}
expectTypeOf(log).returns.toEqualTypeOf<___>(); // returning nothing is void
function fail(message: string): never {
  throw new Error(message);
}
expectTypeOf(fail).returns.toEqualTypeOf<___>(); // a function that cannot return
expect(() => fail('stop'), 'it throws instead').toThrow(___);
expectTypeOf<string & number>().toEqualTypeOf<___>(); // nothing is both a string and a number
expectTypeOf<string | never>().toEqualTypeOf<___>(); // never disappears from a union
