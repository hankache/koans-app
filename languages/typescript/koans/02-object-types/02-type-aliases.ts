// title: Type aliases
// intro: `type` gives any type a name, not just an object's. `&` combines object types into one with all their properties, much as `extends` does.
type Id = string | number;
const a: Id = 7;
const b: Id = 'seven';
expect([a, b], 'either kind of id').toEqual(___);
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;
const person: Person = { name: 'Alan', age: 41 };
expectTypeOf(person).toEqualTypeOf<___>(); // & has all the properties
type Callback = (result: string) => void;
expectTypeOf<Callback>().parameter(0).toEqualTypeOf<___>(); // .parameter(n): a parameter's type
