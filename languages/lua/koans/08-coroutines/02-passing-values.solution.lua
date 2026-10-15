local co = coroutine.create(function(a)
  local b = coroutine.yield(a * 2)
  local c = coroutine.yield(a + b)
  return a + b + c
end)
assert.are.same({true, 20}, {coroutine.resume(co, 10)}, 'the first resume passes the arguments')
assert.are.same({true, 15}, {coroutine.resume(co, 5)}, 'the next resume answers yield')
assert.are.same({true, 16}, {coroutine.resume(co, 1)}, 'and the last gets the return value')
assert.are.same({false, 'cannot resume dead coroutine'}, {coroutine.resume(co)}, 'a finished coroutine cannot go on')
