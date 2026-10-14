function log(message: string) {
  console.info(message);
}
expectTypeOf(log).returns.toEqualTypeOf<void>(); // returning nothing is void
function fail(message: string): never {
  throw new Error(message);
}
expectTypeOf(fail).returns.toEqualTypeOf<never>(); // a function that cannot return
expect(() => fail('stop'), 'it throws instead').toThrow('stop');
expectTypeOf<string & number>().toEqualTypeOf<never>(); // nothing is both a string and a number
expectTypeOf<string | never>().toEqualTypeOf<string>(); // never disappears from a union
