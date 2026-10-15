-- title: Generators
-- intro: `coroutine.wrap` turns a function that yields into an iterator, which the generic `for` can use directly.
local function fibonacci(limit)
  return coroutine.wrap(function()
    local a, b = 0, 1
    while a <= limit do
      coroutine.yield(a)
      a, b = b, a + b
    end
  end)
end
local seen = {}
for n in fibonacci(20) do seen[#seen + 1] = n end
assert.are.same(___, seen, 'a generator in a for loop')
local function permutations(t, n)
  n = n or #t
  if n <= 1 then
    coroutine.yield(table.concat(t))
  else
    for i = 1, n do
      t[n], t[i] = t[i], t[n]
      permutations(t, n - 1)
      t[n], t[i] = t[i], t[n]
    end
  end
end
local all = {}
for p in coroutine.wrap(function() permutations({'a', 'b', 'c'}) end) do all[#all + 1] = p end
assert.are.equal(___, #all, 'yield works from deep inside recursion')
