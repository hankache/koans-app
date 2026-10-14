const double = n => n * 2;
expect(double(4), 'one parameter needs no parentheses').toBe(8);
const add = (a, b) => a + b;
expect(add(2, 3), 'more than one does').toBe(5);
const point = (x, y) => ({ x, y });
expect(point(1, 2), 'parentheses make the braces an object, not a body').toEqual({ x: 1, y: 2 });
const block = n => {
  const squared = n * n;
  return squared + 1;
};
expect(block(3), 'a body in braces needs return').toBe(10);
