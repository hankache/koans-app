// title: Declarations and expressions
// intro: A function can be declared, or created as an expression and assigned. Either way it's a value: it has a name and a `length`, the number of parameters it declares.
function add(a, b) {
  return a + b;
}
const subtract = function (a, b) {
  return a - b;
};
expect(add(2, 3), 'a declared function').toBe(___);
expect(subtract(5, 3), 'a function expression').toBe(___);
expect(subtract.name, 'it takes the name of its variable').toBe(___);
expect(add.length, 'length counts declared parameters').toBe(___);
function nothing() {}
expect(nothing(), 'a function without return returns undefined').toBe(___);
