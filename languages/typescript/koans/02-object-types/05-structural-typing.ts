// title: Structural typing
// intro: TypeScript compares types by their shape, not their names: a value fits a type when it has the properties the type asks for.
interface Named {
  name: string;
}
interface Pet {
  name: string;
}
assert.typeEqual<Named, ___>('two names, one shape: the same type');
function greet(who: Named): string {
  return `Hello, ${who.name}`;
}
const dog = { name: 'Rex', breed: 'collie' };
assert.equal(greet(dog), ___, 'extra properties are fine');
const cat: Pet = { name: 'Tom' };
assert.equal(greet(cat), ___, 'a Pet is a Named');
