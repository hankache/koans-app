const ages: Record<string, number> = { Ada: 36 };
assert.type<number>(ages['Grace'], 'any key is promised a number');
assert.equal(ages['Grace'], undefined, 'but at run time the key may be missing');
type Scores = { [name: string]: number };
assert.typeEqual<Scores, Record<string, number>>('the same type, written two ways');
type Role = 'admin' | 'user';
const allowed: Record<Role, boolean> = { admin: true, user: false };
assert.typeEqual<keyof typeof allowed, Role>('with literal keys, every one must be there');
assert.equal(allowed.user, false, 'and each has its value');
