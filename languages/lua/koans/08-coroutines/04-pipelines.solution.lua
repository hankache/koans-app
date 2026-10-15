local function source(list)
  return coroutine.wrap(function()
    for _, v in ipairs(list) do coroutine.yield(v) end
  end)
end
local function filter(pred, input)
  return coroutine.wrap(function()
    for v in input do
      if pred(v) then coroutine.yield(v) end
    end
  end)
end
local function map(f, input)
  return coroutine.wrap(function()
    for v in input do coroutine.yield(f(v)) end
  end)
end
local out = {}
local pipeline = map(function(n) return n * n end, filter(function(n) return n % 2 == 1 end, source({1, 2, 3, 4, 5})))
for v in pipeline do out[#out + 1] = v end
assert.are.same({1, 9, 25}, out, 'odd numbers, squared')
