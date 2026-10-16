const point = Object.freeze({ x: 1, inner: { y: 2 } });
expect(() => { point.x = 5; }, 'assigning to a frozen object throws').toThrow(TypeError);
expect(Object.isFrozen(point), 'Object.isFrozen asks').toBe(true);
point.inner.y = 3;
expect(point.inner.y, 'freezing is shallow').toBe(3);
const sealed = Object.seal({ a: 1 });
sealed.a = 2;
expect(sealed.a, 'a sealed object can change its properties').toBe(2);
expect(() => { sealed.b = 1; }, 'but not gain new ones').toThrow(TypeError);
