local function count(...)
  return select('#', ...)
end
assert.are.equal(3, count(1, nil, 3), 'select counts them all')
local function sum(...)
  local total = 0
  for _, n in ipairs({...}) do
    total = total + n
  end
  return total
end
assert.are.equal(6, sum(1, 2, 3), '{...} gathers them')
assert.are.equal(0, sum(), 'even when there are none')
