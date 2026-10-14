// title: Parameters
// intro: A parameter can have a default, used when its argument is missing or `undefined`. `...rest` gathers the remaining arguments into an array, and spreading passes an array as arguments.
const greet = (name = 'world') => `Hello, ${name}!`;
expect(greet(), 'a default fills in a missing argument').toBe(___);
expect(greet(undefined), 'and an undefined one').toBe(___);
expect(greet(null), 'but not null').toBe(___);
const sum = (...nums) => nums.reduce((t, n) => t + n, 0);
expect(sum(1, 2, 3), '...nums gathers the arguments').toBe(___);
expect(sum(...[4, 5]), 'spreading passes an array as arguments').toBe(___);
