// title: Optional and default parameters
// intro: `name?` makes a parameter optional; a default value does too, and gives it its type. `...rest` gathers the remaining arguments into an array.
function greet(name?: string): string {
  return `Hello, ${name ?? 'world'}`;
}
assert.equal(greet(), ___, 'an optional parameter may be left out');
function repeat(s: string, times = 2): string {
  return s.repeat(times);
}
assert.equal(repeat('ab'), ___, 'a default fills it in');
assert.typeEqual<Parameters<typeof repeat>[1], ___>('a default makes it optional, of its type');
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}
assert.equal(sum(1, 2, 3), ___, 'rest parameters gather the arguments');
assert.typeEqual<Parameters<typeof sum>, ___>('into an array');
