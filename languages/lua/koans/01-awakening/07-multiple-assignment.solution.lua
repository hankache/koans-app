local a, b, c = 1, 2
assert.are.equal(nil, c, 'a missing value is nil')
local d, e = 1, 2, 3
assert.are.equal(2, e, 'an extra one is dropped')
local x, y = 1, 2
x, y = y, x
assert.are.equal(2, x, 'so swapping needs no temporary')
local t = {}
local i = 1
i, t[i] = i + 1, 'first'
assert.are.equal('first', t[1], 't[i] used the old i')
