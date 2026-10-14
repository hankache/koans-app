// title: Branded types
// intro: Two kinds of id that are both strings are interchangeable by shape. Intersecting with a unique brand makes them distinct types, at no cost at run time.
type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };
const userId = (raw: string) => raw as UserId;
const id = userId('u-42');
expectTypeOf(id).toExtend<___>(); // still a string
expectTypeOf<UserId>().not.toExtend<___>(); // but not an OrderId
expect(id.startsWith('u-'), 'nothing changes at run time').toBe(___);
