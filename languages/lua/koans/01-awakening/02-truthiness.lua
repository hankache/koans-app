-- title: Truthiness
-- intro: Only `false` and `nil` count as false in Lua. Zero and the empty string are true. `a and b or c` is Lua's way of choosing between two values.
assert.are.equal(___, not not 0, 'zero counts as true')
assert.are.equal(___, not not '', 'so does the empty string')
assert.are.equal(___, not not nil, 'nil counts as false')
assert.are.equal(___, nil or 'default', 'or picks the first true value')
assert.are.equal(___, nil and 'never', 'and stops at the first false one')
assert.are.equal(___, 10 > 5 and 'big' or 'small', 'and with or chooses')
