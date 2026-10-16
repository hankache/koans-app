// title: Arrow functions
// intro: `=>` makes a short function. With an expression after the arrow, it returns that expression; to return an object, put it in parentheses.
const double = n => n * 2;
expect(double(4), 'one parameter needs no parentheses').toBe(___);
const add = (a, b) => a + b;
expect(add(2, 3), 'more than one does').toBe(___);
const point = (x, y) => ({ x, y });
expect(point(1, 2), 'parentheses make the braces an object, not a body').toEqual(___);
const block = n => {
  const squared = n * n;
  return squared + 1;
};
expect(block(3), 'a body in braces needs return').toBe(___);
