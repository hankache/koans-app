const m = [
  [1, 2, 3],
  [4, 5, 6],
];
const transpose = grid => grid[0].map((_, c) => grid.map(row => row[c]));
expect(transpose(m), 'columns become rows').toEqual([[1, 4], [2, 5], [3, 6]]);
const rotate = grid => transpose(grid).map(row => row.toReversed());
expect(rotate(m), 'a quarter turn clockwise').toEqual([[4, 1], [5, 2], [6, 3]]);
expect(m.flat().reduce((a, b) => a + b), 'the sum of every cell').toBe(21);
const diagonal = [[1, 0], [0, 1]].map((row, i) => row[i]);
expect(diagonal, 'the diagonal').toEqual([1, 1]);
expect(transpose(transpose(m)), 'transposing twice gives it back').toEqual(m);
