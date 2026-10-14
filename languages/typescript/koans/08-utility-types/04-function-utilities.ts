// title: Function utility types
// intro: `ReturnType` and `Parameters` take a function type apart, and `Awaited` unwraps promises, however deeply.
function makeUser(name: string, admin: boolean) {
  return { name, admin, created: new Date() };
}
expectTypeOf<ReturnType<typeof makeUser>>().toEqualTypeOf<___>(); // what it returns
expectTypeOf<Parameters<typeof makeUser>[1]>().toEqualTypeOf<___>(); // its second parameter
async function load() {
  return [1, 2, 3];
}
expectTypeOf<ReturnType<typeof load>>().toEqualTypeOf<___>(); // an async function returns a promise
expectTypeOf<Awaited<ReturnType<typeof load>>>().toEqualTypeOf<___>(); // Awaited unwraps it
