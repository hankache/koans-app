-- title: Coroutines
-- intro: A coroutine is a function that can pause with `coroutine.yield` and carry on where it left off when resumed. `coroutine.wrap` makes one that resumes when called, which is handy for generators.
local co = coroutine.create(function()
  coroutine.yield(1)
  coroutine.yield(2)
  return 3
end)
assert.are.equal(___, select(2, coroutine.resume(co)), 'resume runs until the first yield')
assert.are.equal(___, coroutine.status(co), 'then the coroutine waits')
assert.are.equal(___, select(2, coroutine.resume(co)), 'and carries on from there')
assert.are.equal(___, select(2, coroutine.resume(co)), 'until it returns')
assert.are.equal(___, coroutine.status(co), 'and is finished')
local squares = coroutine.wrap(function()
  for i = 1, 3 do coroutine.yield(i * i) end
end)
squares()
assert.are.equal(___, squares(), 'wrap makes a generator')
