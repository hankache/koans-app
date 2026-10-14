function makeUser(name: string, admin: boolean) {
  return { name, admin, created: new Date() };
}
expectTypeOf<ReturnType<typeof makeUser>>().toEqualTypeOf<{ name: string; admin: boolean; created: Date }>(); // what it returns
expectTypeOf<Parameters<typeof makeUser>[1]>().toEqualTypeOf<boolean>(); // its second parameter
async function load() {
  return [1, 2, 3];
}
expectTypeOf<ReturnType<typeof load>>().toEqualTypeOf<Promise<number[]>>(); // an async function returns a promise
expectTypeOf<Awaited<ReturnType<typeof load>>>().toEqualTypeOf<number[]>(); // Awaited unwraps it
