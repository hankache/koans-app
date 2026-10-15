-- title: References
-- intro: A variable holds a reference to a table, not a copy: two names can share one table. Copying means building a new table.
local a = {x = 1}
local b = a
b.x = 2
assert.are.equal(___, a.x, 'a and b are the same table')
local copy = {}
for k, v in pairs(a) do
  copy[k] = v
end
copy.x = 3
assert.are.equal(___, a.x, 'a copy is a new table')
local grid = {{1, 2}, {3, 4}}
assert.are.equal(___, grid[2][1], 'tables nest')
