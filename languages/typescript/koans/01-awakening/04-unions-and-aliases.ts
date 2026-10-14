// title: Unions and type aliases
// intro: `type` gives a type a name. A union `A | B` accepts a value of either type, and a union of literal types lists the exact values allowed.
type ID = string | number;
assert.typeEqual<ID, ___>('a type alias names a type');
function label(id: ID): string {
  return `#${id}`;
}
assert.equal(label(7), ___, 'a union accepts either');
type Answer = 'yes' | 'no';
assert.typeEqual<Answer, ___>('a union of literal types lists the values allowed');
assert.typeEqual<Answer | 'maybe', ___>('unions combine');
