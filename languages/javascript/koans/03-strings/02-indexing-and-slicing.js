// title: Indexing and slicing
// intro: `s[i]` is one character, counting from 0. `at()` also counts from the end with negative numbers, and `slice(start, end)` stops just before `end`.
const s = 'JavaScript';
assert.equal(s[0], ___, 'the first character');
assert.equal(s.at(-1), ___, 'at(-1) is the last');
assert.equal(s.slice(0, 4), ___, 'a slice stops before its end');
assert.equal(s.slice(-6), ___, 'or counts from the end');
assert.equal(s.length, ___, 'length counts the characters');
assert.equal(s[100], ___, 'past the end there is nothing');
