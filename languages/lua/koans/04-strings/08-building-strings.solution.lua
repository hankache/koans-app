local parts = {}
for i = 1, 5 do
  parts[#parts + 1] = i * i
end
assert.are.equal('1,4,9,16,25', table.concat(parts, ','), 'concat joins numbers too')
assert.are.equal('2-3', table.concat({1, 2, 3, 4}, '-', 2, 3), 'or a range of the list')
assert.are.equal('x = 1.5, y = 2', string.format('x = %.1f, y = %d', 1.5, 2), 'format for mixed values')
assert.are.equal('[  42]', string.format('[%4d]', 42), 'a width')
assert.are.equal('[ab  ]', string.format('[%-4s]', 'ab'), 'left-aligned')
