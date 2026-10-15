local Vector = {}
Vector.__index = Vector
Vector.__add = function(a, b) return setmetatable({x = a.x + b.x, y = a.y + b.y}, Vector) end
Vector.__eq = function(a, b) return a.x == b.x and a.y == b.y end
Vector.__tostring = function(v) return '(' .. v.x .. ', ' .. v.y .. ')' end
local function vec(x, y) return setmetatable({x = x, y = y}, Vector) end
local sum = vec(1, 2) + vec(3, 4)
assert.are.equal(4, sum.x, '__add makes + work')
assert.are.equal(true, sum == vec(4, 6), '__eq makes == compare contents')
assert.are.equal('(4, 6)', tostring(sum), '__tostring makes tostring work')
