-- title: select and unpack
-- intro: `select(n, …)` returns the arguments from the nth on, or counts them with `'#'`; a negative n counts from the end. `table.unpack` takes a range of a list.
assert.are.same(___, {select(3, 'a', 'b', 'c', 'd')}, 'from the third on')
assert.are.equal(___, select(-1, 'a', 'b', 'c', 'd'), 'the last one')
assert.are.equal(___, select('#', 1, nil, nil, 4), 'counting includes nils')
assert.are.same(___, {table.unpack({10, 20, 30, 40}, 2, 3)}, 'unpack a range')
assert.are.equal(___, math.max(table.unpack({3, 5, 1})), 'spread a list into arguments')
assert.are.same(___, {(function(...) return ... end)(1, 'x')}, '... passes all arguments on')
