local calls = 0
local function memoize(f)
  local cache = {}
  return function(n)
    if cache[n] == nil then cache[n] = f(n) end
    return cache[n]
  end
end
local slow_square = function(n)
  calls = calls + 1
  return n * n
end
local square = memoize(slow_square)
square(9)
square(9)
assert.are.equal(1, calls, 'the second call came from the cache')
local fib
fib = memoize(function(n)
  if n < 2 then return n end
  return fib(n - 1) + fib(n - 2)
end)
assert.are.equal(12586269025, fib(50), 'memoized recursion is fast')
