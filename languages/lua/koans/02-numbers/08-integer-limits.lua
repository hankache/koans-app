-- title: Integer limits
-- intro: Integers have 64 bits: past `math.maxinteger` they wrap around to `math.mininteger`. Integer division by zero is an error; float division by zero gives infinity.
assert.are.equal(___, math.maxinteger, 'the largest integer, 2^63 - 1')
assert.are.equal(___, math.maxinteger + 1, 'one more wraps around')
assert.are.equal(___, math.ult(1, -1), 'math.ult compares as unsigned, where -1 is the largest')
assert.has_error(function() return 1 // 0 end, 'integer division by zero is an error')
assert.are.equal(___, 1.0 // 0, 'float division by zero is infinity')
assert.are.equal(___, math.tointeger(3.0), 'tointeger turns a whole float into an integer')
assert.are.equal(___, math.tointeger(3.5), 'and gives nil for the rest')
