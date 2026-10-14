const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));
expect(factorial(5), 'factorial calls itself').toBe(120);
const flatten = items => items.flatMap(item => (Array.isArray(item) ? flatten(item) : [item]));
expect(flatten([1, [2, [3, 4]], 5]), 'recursion fits nested data').toEqual([1, 2, 3, 4, 5]);
const tree = { value: 1, children: [{ value: 2, children: [] }, { value: 3, children: [{ value: 4, children: [] }] }] };
const total = node => node.value + node.children.reduce((sum, child) => sum + total(child), 0);
expect(total(tree), 'add up a tree').toBe(10);
