-- title: string.pack
-- intro: `string.pack` turns values into bytes by a format: `I2` is an unsigned integer in two bytes, `>` and `<` choose which end goes first. `string.unpack` reads them back.
local packed = string.pack('>I2', 258)
assert.are.equal(___, #packed, 'two bytes')
assert.are.same(___, {packed:byte(1, -1)}, '> puts the big end first')
assert.are.same(___, {string.pack('<I2', 258):byte(1, -1)}, '< puts it last')
assert.are.equal(___, (string.unpack('>I2', packed)), 'unpack reads it back')
assert.are.equal(___, select(2, string.unpack('>I2', packed)), 'and says where the next value starts')
assert.are.equal(___, string.packsize('i4i4'), 'packsize: the size of a format')
assert.are.equal(___, (string.unpack('s1', string.pack('s1', 'hi'))), 's1: text after a one-byte length')
