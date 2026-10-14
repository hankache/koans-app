function isString(x: unknown): x is string {
  return typeof x === 'string';
}
const items: unknown[] = ['a', 1, 'b'];
const strings = items.filter(isString);
assert.type<string[]>(strings, 'a type predicate narrows what filter returns');
assert.deepEqual(strings, ['a', 'b'], 'and filter keeps the strings');
const inferred = items.filter(x => typeof x === 'string');
assert.type<string[]>(inferred, 'TypeScript infers simple predicates itself');
type Light = 'red' | 'green';
function next(light: Light): Light {
  switch (light) {
    case 'red':
      return 'green';
    case 'green':
      return 'red';
    default: {
      const unreachable: never = light;
      return unreachable;
    }
  }
}
assert.equal(next('red'), 'green', 'every case is handled');
assert.typeEqual<Exclude<Light, 'red' | 'green'>, never>('so nothing is left');
