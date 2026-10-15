local t = {1, 2, 3}
t[#t + 1] = 4
assert.are.equal(4, #t, '#t + 1 is the next free place')
t[#t] = nil
assert.are.equal(3, #t, 'removing the last shortens it')
local packed = table.pack(1, nil, 3)
assert.are.equal(3, packed.n, 'table.pack records the real count in n')
local count = 0
for _ in pairs({a = 1, b = 2}) do count = count + 1 end
assert.are.equal(2, count, 'a table with keys has to be counted')
assert.are.equal(0, #{a = 1, b = 2}, 'because # only counts the sequence')
