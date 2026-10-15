-- title: Length and holes
-- intro: `#t` is only reliable for a sequence: values at 1, 2, 3 … with no `nil` gaps. With holes, any border may be reported, so keep arrays without them, or count them yourself.
local t = {1, 2, 3}
t[#t + 1] = 4
assert.are.equal(___, #t, '#t + 1 is the next free place')
t[#t] = nil
assert.are.equal(___, #t, 'removing the last shortens it')
local packed = table.pack(1, nil, 3)
assert.are.equal(___, packed.n, 'table.pack records the real count in n')
local count = 0
for _ in pairs({a = 1, b = 2}) do count = count + 1 end
assert.are.equal(___, count, 'a table with keys has to be counted')
assert.are.equal(___, #{a = 1, b = 2}, 'because # only counts the sequence')
