-- title: Tables as arrays
-- intro: A table with keys 1, 2, 3… is an array. Arrays count from 1, `#` gives the length, and `table.insert` and `table.remove` work at the end.
local t = {10, 20, 30}
assert.are.equal(___, t[1], 'arrays count from 1')
assert.are.equal(___, t[0], 'so there is nothing at 0')
assert.are.equal(___, #t, '# is the length')
table.insert(t, 40)
assert.are.equal(___, t[#t], 'insert adds to the end')
assert.are.equal(___, table.remove(t), 'remove takes from the end')
assert.are.same(___, t, 'and the table is as before')
