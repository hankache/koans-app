-- title: Varargs
-- intro: `...` stands for any number of arguments. `select('#', ...)` counts them, nils included, and `{...}` gathers them into a table.
local function count(...)
  return select('#', ...)
end
assert.are.equal(___, count(1, nil, 3), 'select counts them all')
local function sum(...)
  local total = 0
  for _, n in ipairs({...}) do
    total = total + n
  end
  return total
end
assert.are.equal(___, sum(1, 2, 3), '{...} gathers them')
assert.are.equal(___, sum(), 'even when there are none')
