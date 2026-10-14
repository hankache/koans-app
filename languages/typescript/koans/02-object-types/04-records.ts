// title: Records and index signatures
// intro: An index signature `{ [key: string]: T }`, or `Record<K, T>`, types an object used as a dictionary. TypeScript trusts that every key is there; the code may still find one missing.
const ages: Record<string, number> = { Ada: 36 };
assert.type<___>(ages['Grace'], 'any key is promised a number');
assert.equal(ages['Grace'], ___, 'but at run time the key may be missing');
type Scores = { [name: string]: number };
assert.typeEqual<Scores, ___>('the same type, written two ways');
type Role = 'admin' | 'user';
const allowed: Record<Role, boolean> = { admin: true, user: false };
assert.typeEqual<keyof typeof allowed, ___>('with literal keys, every one must be there');
assert.equal(allowed.user, ___, 'and each has its value');
