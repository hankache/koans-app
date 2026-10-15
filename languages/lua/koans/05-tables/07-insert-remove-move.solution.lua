local t = {'a', 'c'}
table.insert(t, 2, 'b')
assert.are.same({'a', 'b', 'c'}, t, 'insert at a position')
assert.are.equal('a', table.remove(t, 1), 'remove from a position')
assert.are.same({'b', 'c'}, t, 'the rest moved down')
local copy = table.move({1, 2, 3}, 1, 3, 1, {})
assert.are.same({1, 2, 3}, copy, 'move copies into a new table')
local shifted = table.move({1, 2, 3}, 1, 3, 2)
assert.are.same({1, 1, 2, 3}, shifted, 'or within one')
