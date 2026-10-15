-- title: The numeric for
-- intro: `for i = start, stop, step do` counts, including `stop`. The step can be negative, and the loop variable is local to the loop.
local total = 0
for i = 1, 4 do
  total = total + i
end
assert.are.equal(___, total, '1 to 4, both included')
local down = {}
for i = 3, 1, -1 do
  down[#down + 1] = i
end
assert.are.same(___, down, 'a negative step counts down')
local odd = {}
for i = 1, 6, 2 do
  odd[#odd + 1] = i
end
assert.are.same(___, odd, 'a step of 2')
local runs = 0
for i = 5, 1 do
  runs = runs + 1
end
assert.are.equal(___, runs, 'a loop whose start is past its stop does not run')
