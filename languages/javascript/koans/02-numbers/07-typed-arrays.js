// title: Typed arrays
// intro: A typed array holds numbers of one fixed kind in a block of memory. A `Uint8Array` holds bytes: values wrap around to fit. Two views of one `ArrayBuffer` share the same bytes.
const bytes = new Uint8Array(3);
expect([...bytes], 'a typed array starts zeroed').toEqual(___);
bytes[0] = 256;
bytes[1] = -1;
expect(bytes[0], 'a byte wraps around past 255').toBe(___);
expect(bytes[1], 'and below 0').toBe(___);
const capped = new Uint8ClampedArray([300, -5]);
expect([...capped], 'a clamped array clamps instead').toEqual(___);
expect(new Float32Array([0.1])[0] === 0.1, 'a 32-bit float loses precision').toBe(___);
const shared = new ArrayBuffer(2);
new Uint8Array(shared).set([1, 1]);
expect(new Uint16Array(shared)[0], 'two views share one buffer').toBe(___);
