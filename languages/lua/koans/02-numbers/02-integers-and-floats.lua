-- title: Integers and floats
-- intro: Lua keeps integers and floats apart, though they compare equal. Integers have a fixed size and wrap around; floats are binary approximations.
assert.are.equal(___, math.type(7 // 2), '// of integers is an integer')
assert.are.equal(___, math.type(6 / 2), '/ is a float, even when it divides exactly')
assert.are.equal(___, math.maxinteger + 1 == math.mininteger, 'integers wrap around')
assert.are.equal(___, 0.1 + 0.2 == 0.3, 'floats are approximations')
assert.are.equal(___, math.tointeger(3.0), 'a float with no fraction can become an integer')
assert.are.equal(___, math.tointeger(3.5), 'one with a fraction cannot')
