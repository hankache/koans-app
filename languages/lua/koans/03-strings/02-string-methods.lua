-- title: String methods
-- intro: The `string` functions can be called as methods with `:`. Positions count from 1, and negative positions count from the end.
local s = 'hello'
assert.are.equal(___, s:upper(), 'upper case')
assert.are.equal(___, s:reverse(), 'reversed')
assert.are.equal(___, s:sub(2, 4), 'sub takes positions 2 to 4')
assert.are.equal(___, s:sub(-3), 'or the last three')
assert.are.equal(___, s:byte(1), 'byte gives a character code')
assert.are.equal(___, string.char(72), 'char goes back')
