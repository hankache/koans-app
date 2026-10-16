// title: Freezing
// intro: `Object.freeze` stops an object changing: in strict code, as koans are, assigning to it throws. Freezing is shallow, and `Object.isFrozen` asks.
const point = Object.freeze({ x: 1, inner: { y: 2 } });
expect(() => { point.x = 5; }, 'assigning to a frozen object throws').toThrow(___);
expect(Object.isFrozen(point), 'Object.isFrozen asks').toBe(___);
point.inner.y = 3;
expect(point.inner.y, 'freezing is shallow').toBe(___);
const sealed = Object.seal({ a: 1 });
sealed.a = 2;
expect(sealed.a, 'a sealed object can change its properties').toBe(___);
expect(() => { sealed.b = 1; }, 'but not gain new ones').toThrow(___);
