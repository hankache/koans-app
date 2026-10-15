-- title: Multiple assignment
-- intro: Several variables can be assigned at once. Missing values become `nil`, extra ones are dropped, and everything on the right is evaluated before anything is assigned.
local a, b, c = 1, 2
assert.are.equal(___, c, 'a missing value is nil')
local d, e = 1, 2, 3
assert.are.equal(___, e, 'an extra one is dropped')
local x, y = 1, 2
x, y = y, x
assert.are.equal(___, x, 'so swapping needs no temporary')
local t = {}
local i = 1
i, t[i] = i + 1, 'first'
assert.are.equal(___, t[1], 't[i] used the old i')
