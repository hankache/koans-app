-- title: Insert, remove and move
-- intro: `table.insert` and `table.remove` take a position too, shifting the rest; `table.move` copies a range, even into another table.
local t = {'a', 'c'}
table.insert(t, 2, 'b')
assert.are.same(___, t, 'insert at a position')
assert.are.equal(___, table.remove(t, 1), 'remove from a position')
assert.are.same(___, t, 'the rest moved down')
local copy = table.move({1, 2, 3}, 1, 3, 1, {})
assert.are.same(___, copy, 'move copies into a new table')
local shifted = table.move({1, 2, 3}, 1, 3, 2)
assert.are.same(___, shifted, 'or within one')
