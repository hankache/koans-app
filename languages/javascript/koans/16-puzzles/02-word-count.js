// title: Word count
// intro: Counting how often each word appears: split, normalize, then tally into a `Map`.
const text = 'the cat and the hat and the bat';
const counts = new Map();
for (const w of text.split(' ')) counts.set(w, (counts.get(w) ?? 0) + 1);
expect(counts.get('the'), 'how often "the" appears').toBe(___);
expect(counts.size, 'how many different words').toBe(___);
const top = [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 2);
expect(top, 'the two most frequent, ties alphabetically').toEqual(___);
expect([...counts.keys()].at(-1), 'the last new word seen').toBe(___);
