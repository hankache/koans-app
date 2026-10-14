type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };
const userId = (raw: string) => raw as UserId;
const id = userId('u-42');
expectTypeOf(id).toExtend<string>(); // still a string
expectTypeOf<UserId>().not.toExtend<OrderId>(); // but not an OrderId
expect(id.startsWith('u-'), 'nothing changes at run time').toBe(true);
