-- title: Formatting
-- intro: `string.format` fills values into a template, C-style. Strings have the string functions as methods, so `('%d'):format(1)` works too.
assert.are.equal(___, string.format('%.2f', 3.14159), 'two decimals')
assert.are.equal(___, string.format('%05d', 42), 'padded with zeros')
assert.are.equal(___, ('%s-%s'):format('a', 'b'), 'format as a method')
assert.are.equal(___, ('%x'):format(255), 'hexadecimal')
assert.are.equal(___, ('%q'):format('hi'), '%q quotes a string the way Lua would')
