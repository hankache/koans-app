function add(a, b) {
  return a + b;
}
const subtract = function (a, b) {
  return a - b;
};
expect(add(2, 3), 'a declared function').toBe(5);
expect(subtract(5, 3), 'a function expression').toBe(2);
expect(subtract.name, 'it takes the name of its variable').toBe('subtract');
expect(add.length, 'length counts declared parameters').toBe(2);
function nothing() {}
expect(nothing(), 'a function without return returns undefined').toBe(undefined);
