local a = {x = 1}
local b = a
b.x = 2
assert.are.equal(2, a.x, 'a and b are the same table')
local copy = {}
for k, v in pairs(a) do
  copy[k] = v
end
copy.x = 3
assert.are.equal(2, a.x, 'a copy is a new table')
local grid = {{1, 2}, {3, 4}}
assert.are.equal(3, grid[2][1], 'tables nest')
