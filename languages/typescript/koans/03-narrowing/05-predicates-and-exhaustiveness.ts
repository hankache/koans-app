// title: Type predicates and exhaustiveness
// intro: A function returning `x is T` tells TypeScript what it checked. And when every case is handled, what's left is `never`, which catches a case someone forgets to add.
function isString(x: unknown): x is string {
  return typeof x === 'string';
}
const items: unknown[] = ['a', 1, 'b'];
const strings = items.filter(isString);
assert.type<___>(strings, 'a type predicate narrows what filter returns');
assert.deepEqual(strings, ___, 'and filter keeps the strings');
const inferred = items.filter(x => typeof x === 'string');
assert.type<___>(inferred, 'TypeScript infers simple predicates itself');
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
assert.equal(next('red'), ___, 'every case is handled');
assert.typeEqual<Exclude<Light, 'red' | 'green'>, ___>('so nothing is left');
