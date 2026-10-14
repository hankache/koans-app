// title: this parameters
// intro: A first parameter named `this` types what `this` must be when the function is called. It isn't a real parameter: callers don't pass it.
interface Counter {
  count: number;
}
function increment(this: Counter, by: number) {
  this.count += by;
  return this.count;
}
const counter = { count: 1, increment };
expect(counter.increment(2), 'called as a method').toBe(___);
expectTypeOf(increment).parameter(0).toEqualTypeOf<___>(); // this is not counted
expectTypeOf<ThisParameterType<typeof increment>>().toEqualTypeOf<___>(); // but it is in the type
