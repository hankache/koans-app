function greet(name?: string): string {
  return `Hello, ${name ?? 'world'}`;
}
assert.equal(greet(), 'Hello, world', 'an optional parameter may be left out');
function repeat(s: string, times = 2): string {
  return s.repeat(times);
}
assert.equal(repeat('ab'), 'abab', 'a default fills it in');
assert.typeEqual<Parameters<typeof repeat>[1], number | undefined>('a default makes it optional, of its type');
function sum(...nums: number[]): number {
  return nums.reduce((total, n) => total + n, 0);
}
assert.equal(sum(1, 2, 3), 6, 'rest parameters gather the arguments');
assert.typeEqual<Parameters<typeof sum>, number[]>('into an array');
