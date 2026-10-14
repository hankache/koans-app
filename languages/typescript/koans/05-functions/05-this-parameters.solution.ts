interface Counter {
  count: number;
}
function increment(this: Counter, by: number) {
  this.count += by;
  return this.count;
}
const counter = { count: 1, increment };
expect(counter.increment(2), 'called as a method').toBe(3);
expectTypeOf(increment).parameter(0).toEqualTypeOf<number>(); // this is not counted
expectTypeOf<ThisParameterType<typeof increment>>().toEqualTypeOf<Counter>(); // but it is in the type
