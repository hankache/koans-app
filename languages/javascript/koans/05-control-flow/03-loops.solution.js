let sum = 0;
for (let i = 1; i <= 4; i++) sum += i;
expect(sum, 'a counting loop').toBe(10);
let n = 100;
let halvings = 0;
while (n > 1) {
  n = Math.floor(n / 2);
  halvings++;
}
expect(halvings, 'while repeats as long as its test holds').toBe(6);
let runs = 0;
do {
  runs++;
} while (false);
expect(runs, 'do…while runs its body at least once').toBe(1);
const letters = [];
for (const ch of 'hey') letters.push(ch.toUpperCase());
expect(letters, 'for…of walks a string by character').toEqual(['H', 'E', 'Y']);
const pairs = [];
for (const [key, value] of new Map([['a', 1], ['b', 2]])) pairs.push(key + value);
expect(pairs, 'and destructures what it gets').toEqual(['a1', 'b2']);
