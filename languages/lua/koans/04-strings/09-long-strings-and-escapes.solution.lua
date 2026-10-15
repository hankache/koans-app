local poem = [[
first
second]]
assert.are.equal('first\nsecond', poem, 'a newline right after [[ is skipped')
assert.are.equal('a]]b', [==[a]]b]==], 'equals signs allow ]] inside')
assert.are.equal('é', '\u{E9}', '\\u{} writes a character by its code point')
assert.are.equal('A', '\65', 'a decimal byte value')
