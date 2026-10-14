const s = 'JavaScript';
assert.equal(s[0], 'J', 'the first character');
assert.equal(s.at(-1), 't', 'at(-1) is the last');
assert.equal(s.slice(0, 4), 'Java', 'a slice stops before its end');
assert.equal(s.slice(-6), 'Script', 'or counts from the end');
assert.equal(s.length, 10, 'length counts the characters');
assert.equal(s[100], undefined, 'past the end there is nothing');
