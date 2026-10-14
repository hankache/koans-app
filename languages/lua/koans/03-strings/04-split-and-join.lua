-- title: Split and join
-- intro: Lua has no `split`: `gmatch` walks through every match of a pattern instead. `table.concat` joins a table of strings.
local words = {}
for word in ('one two three'):gmatch('%a+') do
  words[#words + 1] = word
end
assert.are.same(___, words, 'gmatch finds every word')
local fields = {}
for field in ('a,b,,c'):gmatch('[^,]+') do
  fields[#fields + 1] = field
end
assert.are.same(___, fields, '[^,]+ means anything but commas')
assert.are.equal(___, table.concat({'a', 'b', 'c'}, '-'), 'table.concat joins')
