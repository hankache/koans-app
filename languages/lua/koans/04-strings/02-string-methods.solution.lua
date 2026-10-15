local s = 'hello'
assert.are.equal('HELLO', s:upper(), 'upper case')
assert.are.equal('olleh', s:reverse(), 'reversed')
assert.are.equal('ell', s:sub(2, 4), 'sub takes positions 2 to 4')
assert.are.equal('llo', s:sub(-3), 'or the last three')
assert.are.equal(104, s:byte(1), 'byte gives a character code')
assert.are.equal('H', string.char(72), 'char goes back')
