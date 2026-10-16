const text = 'the cat and the hat and the bat';
const counts = new Map();
for (const w of text.split(' ')) counts.set(w, (counts.get(w) ?? 0) + 1);
expect(counts.get('the'), 'how often "the" appears').toBe(3);
expect(counts.size, 'how many different words').toBe(5);
const top = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 2);
expect(top, 'the two most frequent, ties alphabetically').toEqual([['the', 3], ['and', 2]]);
expect([...counts.keys()].at(-1), 'the last new word seen').toBe('bat');
