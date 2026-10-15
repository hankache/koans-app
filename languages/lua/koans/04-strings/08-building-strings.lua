-- title: Building strings
-- intro: Joining strings one by one with `..` in a loop copies them again and again. Collecting pieces in a table and calling `table.concat` once is the Lua way.
local parts = {}
for i = 1, 5 do
  parts[#parts + 1] = i * i
end
assert.are.equal(___, table.concat(parts, ','), 'concat joins numbers too')
assert.are.equal(___, table.concat({1, 2, 3, 4}, '-', 2, 3), 'or a range of the list')
assert.are.equal(___, string.format('x = %.1f, y = %d', 1.5, 2), 'format for mixed values')
assert.are.equal(___, string.format('[%4d]', 42), 'a width')
assert.are.equal(___, string.format('[%-4s]', 'ab'), 'left-aligned')
