local total = 0
for i = 1, 4 do
  total = total + i
end
assert.are.equal(10, total, '1 to 4, both included')
local down = {}
for i = 3, 1, -1 do
  down[#down + 1] = i
end
assert.are.same({3, 2, 1}, down, 'a negative step counts down')
local odd = {}
for i = 1, 6, 2 do
  odd[#odd + 1] = i
end
assert.are.same({1, 3, 5}, odd, 'a step of 2')
local runs = 0
for i = 5, 1 do
  runs = runs + 1
end
assert.are.equal(0, runs, 'a loop whose start is past its stop does not run')
