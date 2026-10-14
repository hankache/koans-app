interface Named {
  name: string;
}
interface Pet {
  name: string;
}
assert.typeEqual<Named, Pet>('two names, one shape: the same type');
function greet(who: Named): string {
  return `Hello, ${who.name}`;
}
const dog = { name: 'Rex', breed: 'collie' };
assert.equal(greet(dog), 'Hello, Rex', 'extra properties are fine');
const cat: Pet = { name: 'Tom' };
assert.equal(greet(cat), 'Hello, Tom', 'a Pet is a Named');
