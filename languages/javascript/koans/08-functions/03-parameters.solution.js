const greet = (name = 'world') => `Hello, ${name}!`;
expect(greet(), 'a default fills in a missing argument').toBe('Hello, world!');
expect(greet(undefined), 'and an undefined one').toBe('Hello, world!');
expect(greet(null), 'but not null').toBe('Hello, null!');
const sum = (...nums) => nums.reduce((t, n) => t + n, 0);
expect(sum(1, 2, 3), '...nums gathers the arguments').toBe(6);
expect(sum(...[4, 5]), 'spreading passes an array as arguments').toBe(9);
