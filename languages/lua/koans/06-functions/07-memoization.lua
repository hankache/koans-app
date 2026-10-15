-- title: Memoization
-- intro: A function can remember the results it has computed, in a table its closure keeps, and answer from there next time.
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
assert.are.equal(___, calls, 'the second call came from the cache')
local fib
fib = memoize(function(n)
  if n < 2 then return n end
  return fib(n - 1) + fib(n - 2)
end)
assert.are.equal(___, fib(50), 'memoized recursion is fast')
