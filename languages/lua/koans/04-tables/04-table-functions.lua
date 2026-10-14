-- title: Table functions
-- intro: `table.sort` sorts an array where it stands, optionally with a comparison function. `table.unpack` spreads an array into separate values, and `table.pack` gathers them.
local t = {3, 1, 2}
table.sort(t)
assert.are.same(___, t, 'sort sorts the table itself')
table.sort(t, function(a, b) return a > b end)
assert.are.same(___, t, 'a function decides the order')
assert.are.equal(___, select('#', table.unpack({1, 2, 3})), 'unpack spreads the values')
assert.are.equal(___, table.pack(1, nil, 3).n, 'pack counts them, nil included')
