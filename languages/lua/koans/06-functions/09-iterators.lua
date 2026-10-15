-- title: Iterators
-- intro: The generic `for` calls an iterator function until it returns `nil`. A closure makes a simple one; `ipairs` and `pairs` are iterators too.
local function range(n)
  local i = 0
  return function()
    i = i + 1
    if i <= n then return i end
  end
end
local seen = {}
for i in range(3) do seen[#seen + 1] = i end
assert.are.same(___, seen, 'a closure as an iterator')
local function evens(t)
  local i = 0
  return function()
    repeat i = i + 1 until t[i] == nil or t[i] % 2 == 0
    if t[i] ~= nil then return i, t[i] end
  end
end
local found = {}
for index, value in evens({1, 4, 7, 8}) do found[#found + 1] = index .. ':' .. value end
assert.are.same(___, found, 'an iterator can return several values')
local f, state, start = ipairs({'a'})
assert.are.same(___, {f(state, start)}, 'ipairs returns a function, a state and a start')
