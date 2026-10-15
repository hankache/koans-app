local words = {}
for word in ('one two three'):gmatch('%a+') do
  words[#words + 1] = word
end
assert.are.same({'one', 'two', 'three'}, words, 'gmatch finds every word')
local fields = {}
for field in ('a,b,,c'):gmatch('[^,]+') do
  fields[#fields + 1] = field
end
assert.are.same({'a', 'b', 'c'}, fields, '[^,]+ means anything but commas')
assert.are.equal('a-b-c', table.concat({'a', 'b', 'c'}, '-'), 'table.concat joins')
