// title: Matrix tricks
// intro: A matrix as an array of rows. Transposing swaps rows and columns; rotating a quarter turn is a transpose with each row reversed.
const m = [
  [1, 2, 3],
  [4, 5, 6],
];
const transpose = grid => grid[0].map((_, c) => grid.map(row => row[c]));
expect(transpose(m), 'columns become rows').toEqual(___);
const rotate = grid => transpose(grid).map(row => row.toReversed());
expect(rotate(m), 'a quarter turn clockwise').toEqual(___);
expect(m.flat().reduce((a, b) => a + b), 'the sum of every cell').toBe(___);
const diagonal = [[1, 0], [0, 1]].map((row, i) => row[i]);
expect(diagonal, 'the diagonal').toEqual(___);
expect(transpose(transpose(m)), 'transposing twice gives it back').toEqual(___);
