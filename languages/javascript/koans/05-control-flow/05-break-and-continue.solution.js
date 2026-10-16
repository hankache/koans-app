const odds = [];
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;
  if (i > 6) break;
  odds.push(i);
}
expect(odds, 'continue skips, break stops').toEqual([1, 3, 5]);
let found = null;
outer: for (const pair of [[1, 2], [3, 4], [5, 6]]) {
  for (const cell of pair) {
    if (cell > 2) {
      found = cell;
      break outer;
    }
  }
}
expect(found, 'break outer leaves both loops').toBe(3);
const kept = [];
rows: for (const pair of [[1, -1], [2, 3]]) {
  for (const cell of pair) if (cell < 0) continue rows;
  kept.push(pair);
}
expect(kept, 'continue rows skips to the next row').toEqual([[2, 3]]);
