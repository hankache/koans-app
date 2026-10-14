type Role = 'admin' | 'guest';
const limits: Record<Role, number> = { admin: 100, guest: 5 };
expect(limits.guest, 'one value per key').toBe(5);
expectTypeOf<Record<'a' | 'b', boolean>>().toEqualTypeOf<{ a: boolean; b: boolean }>(); // what a Record is
class Point {
  constructor(public x = 0, public y = 0) {}
}
const PointClass = Point;
expectTypeOf<InstanceType<typeof PointClass>>().toEqualTypeOf<Point>(); // what new makes
expectTypeOf<ConstructorParameters<typeof Point>>().toEqualTypeOf<[x?: number, y?: number]>(); // and what it takes
