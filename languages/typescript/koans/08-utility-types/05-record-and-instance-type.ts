// title: Record and InstanceType
// intro: `Record<K, V>` builds an object type from keys and a value type. `InstanceType` gives the type of what a class's constructor makes.
type Role = 'admin' | 'guest';
const limits: Record<Role, number> = { admin: 100, guest: 5 };
expect(limits.guest, 'one value per key').toBe(___);
expectTypeOf<Record<'a' | 'b', boolean>>().toEqualTypeOf<___>(); // what a Record is
class Point {
  constructor(public x = 0, public y = 0) {}
}
const PointClass = Point;
expectTypeOf<InstanceType<typeof PointClass>>().toEqualTypeOf<___>(); // what new makes
expectTypeOf<ConstructorParameters<typeof Point>>().toEqualTypeOf<___>(); // and what it takes
