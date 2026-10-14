-- title: Arithmetic
-- intro: `/` always divides exactly and gives a float; `//` rounds down. `%` takes the sign of the divisor, and `^` is a power, always a float.
assert.are.equal(___, 7 / 2, '/ divides exactly')
assert.are.equal(___, 7 // 2, '// rounds down')
assert.are.equal(___, -7 // 2, 'down means toward minus infinity')
assert.are.equal(___, 7 % 3, '% is the remainder')
assert.are.equal(___, -7 % 3, 'with the sign of the divisor')
assert.are.equal(___, 2 ^ 10, '^ is a power')
