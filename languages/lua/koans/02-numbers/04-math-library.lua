-- title: The math library
-- intro: `math` has the usual functions and constants, including `math.huge`, a number bigger than any other.
assert.are.equal(___, math.max(3, 7, 1), 'the largest')
assert.are.equal(___, math.abs(-4), 'distance from zero')
assert.are.equal(___, math.floor(3.7), 'floor rounds down')
assert.are.equal(___, math.ceil(3.2), 'ceil rounds up')
assert.are.equal(___, math.huge > 10 ^ 300, 'math.huge is infinity')
assert.are.equal(___, math.pi > 3.14, 'and math.pi is what you think')
