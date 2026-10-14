function label(text: string, suffix?: string) {
  expectTypeOf(suffix).toEqualTypeOf<string | undefined>(); // an optional parameter
  return suffix ? `${text} ${suffix}` : text;
}
expect(label('tea'), 'left out').toBe('tea');
function repeat(text: string, times = 2) {
  return text.repeat(times);
}
expectTypeOf(repeat).parameter(1).toEqualTypeOf<number>(); // a default parameter takes the default's type
expect(repeat('ab'), 'and may be left out').toBe('abab');
function sum(...nums: number[]) {
  return nums.reduce((t, n) => t + n, 0);
}
expect(sum(1, 2, 3), 'a rest parameter').toBe(6);
