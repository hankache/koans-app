// title: Optional, default and rest
// intro: A `?` parameter may be left out, a default parameter takes its type from the default, and a rest parameter collects the remaining arguments into an array.
function label(text: string, suffix?: string) {
  expectTypeOf(suffix).toEqualTypeOf<___>(); // an optional parameter
  return suffix ? `${text} ${suffix}` : text;
}
expect(label('tea'), 'left out').toBe(___);
function repeat(text: string, times = 2) {
  return text.repeat(times);
}
expectTypeOf(repeat).parameter(1).toEqualTypeOf<___>(); // a default parameter takes the default's type
expect(repeat('ab'), 'and may be left out').toBe(___);
function sum(...nums: number[]) {
  return nums.reduce((t, n) => t + n, 0);
}
expect(sum(1, 2, 3), 'a rest parameter').toBe(___);
