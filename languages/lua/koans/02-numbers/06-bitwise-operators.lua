-- title: Bitwise operators
-- intro: Lua 5.4 works on the bits of integers with `&`, `|`, `~` (exclusive or, or not when it has one operand), `<<` and `>>`.
assert.are.equal(___, 12 & 10, '& keeps the bits set in both')
assert.are.equal(___, 12 | 10, '| keeps the bits set in either')
assert.are.equal(___, 12 ~ 10, '~ between two numbers is exclusive or')
assert.are.equal(___, ~0, '~ alone flips every bit')
assert.are.equal(___, 1 << 4, '<< shifts left')
assert.are.equal(___, 13 >> 2, '>> shifts right')
assert.are.equal(___, (0x0f & 0x3c) == 0x0c, 'hexadecimal makes masks readable')
