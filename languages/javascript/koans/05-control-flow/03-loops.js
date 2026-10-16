// title: Loops
// intro: `for (init; test; step)` counts, `while` tests first, and `do … while` tests after the body, so it runs at least once. `for…of` walks the values of anything iterable.
let sum = 0;
for (let i = 1; i <= 4; i++) sum += i;
expect(sum, 'a counting loop').toBe(___);
let n = 100;
let halvings = 0;
while (n > 1) {
  n = Math.floor(n / 2);
  halvings++;
}
expect(halvings, 'while repeats as long as its test holds').toBe(___);
let runs = 0;
do {
  runs++;
} while (false);
expect(runs, 'do…while runs its body at least once').toBe(___);
const letters = [];
for (const ch of 'hey') letters.push(ch.toUpperCase());
expect(letters, 'for…of walks a string by character').toEqual(___);
const pairs = [];
for (const [key, value] of new Map([['a', 1], ['b', 2]])) pairs.push(key + value);
expect(pairs, 'and destructures what it gets').toEqual(___);
