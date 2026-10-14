type Id = string | number;
const a: Id = 7;
const b: Id = 'seven';
expect([a, b], 'either kind of id').toEqual([7, 'seven']);
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;
const person: Person = { name: 'Alan', age: 41 };
expectTypeOf(person).toEqualTypeOf<{ name: string; age: number }>(); // & has all the properties
type Callback = (result: string) => void;
expectTypeOf<Callback>().parameter(0).toEqualTypeOf<string>(); // .parameter(n): a parameter's type
