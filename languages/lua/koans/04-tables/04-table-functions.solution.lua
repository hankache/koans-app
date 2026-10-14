local t = {3, 1, 2}
table.sort(t)
assert.are.same({1, 2, 3}, t, 'sort sorts the table itself')
table.sort(t, function(a, b) return a > b end)
assert.are.same({3, 2, 1}, t, 'a function decides the order')
assert.are.equal(3, select('#', table.unpack({1, 2, 3})), 'unpack spreads the values')
assert.are.equal(3, table.pack(1, nil, 3).n, 'pack counts them, nil included')
