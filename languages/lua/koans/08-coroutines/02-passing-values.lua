-- title: Passing values
-- intro: Values flow both ways: arguments to `resume` arrive as the results of `yield`, and arguments to `yield` come out of `resume`.
local co = coroutine.create(function(a)
  local b = coroutine.yield(a * 2)
  local c = coroutine.yield(a + b)
  return a + b + c
end)
assert.are.same(___, {coroutine.resume(co, 10)}, 'the first resume passes the arguments')
assert.are.same(___, {coroutine.resume(co, 5)}, 'the next resume answers yield')
assert.are.same(___, {coroutine.resume(co, 1)}, 'and the last gets the return value')
assert.are.same(___, {coroutine.resume(co)}, 'a finished coroutine cannot go on')
