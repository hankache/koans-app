type ID = string | number;
assert.typeEqual<ID, string | number>('a type alias names a type');
function label(id: ID): string {
  return `#${id}`;
}
assert.equal(label(7), '#7', 'a union accepts either');
type Answer = 'yes' | 'no';
assert.typeEqual<Answer, 'yes' | 'no'>('a union of literal types lists the values allowed');
assert.typeEqual<Answer | 'maybe', 'yes' | 'no' | 'maybe'>('unions combine');
