// title: Indexing and slicing
// intro: `s[i]` is one character, counting from 0. `at()` also counts from the end with negative numbers, and `slice(start, end)` stops just before `end`.
const s = 'JavaScript';
expect(s[0], 'the first character').toBe(___);
expect(s.at(-1), 'at(-1) is the last').toBe(___);
expect(s.slice(0, 4), 'a slice stops before its end').toBe(___);
expect(s.slice(-6), 'or counts from the end').toBe(___);
expect(s[100], 'past the end there is nothing').toBe(___);
expect(s, 'toHaveLength works on strings').toHaveLength(___);
