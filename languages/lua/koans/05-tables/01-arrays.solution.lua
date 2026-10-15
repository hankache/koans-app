local t = {10, 20, 30}
assert.are.equal(10, t[1], 'arrays count from 1')
assert.are.equal(nil, t[0], 'so there is nothing at 0')
assert.are.equal(3, #t, '# is the length')
table.insert(t, 40)
assert.are.equal(40, t[#t], 'insert adds to the end')
assert.are.equal(40, table.remove(t), 'remove takes from the end')
assert.are.same({10, 20, 30}, t, 'and the table is as before')
