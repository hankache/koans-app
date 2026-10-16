// title: Recursive types
// intro: A type can refer to itself, which describes nested data like JSON or a linked list. A conditional type can recurse too, peeling a type one level at a time.
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
expectTypeOf({ a: [1, { b: null }] }).toExtend<___>(); // nested data fits Json
expectTypeOf(() => 1).not.toExtend<___>(); // a function does not
type Flatten<T> = T extends readonly (infer U)[] ? Flatten<U> : T;
expectTypeOf<Flatten<number[][][]>>().toEqualTypeOf<___>(); // it unwraps every level
expectTypeOf<Flatten<string>>().toEqualTypeOf<___>(); // a non-array stays as it is
interface ListNode {
  value: number;
  next: ListNode | null;
}
const list: ListNode = { value: 1, next: { value: 2, next: { value: 3, next: null } } };
let total = 0;
for (let node: ListNode | null = list; node; node = node.next) total += node.value;
expect(total, 'walking a linked list').toBe(___);
