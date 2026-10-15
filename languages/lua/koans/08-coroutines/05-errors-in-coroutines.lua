-- title: Errors in coroutines
-- intro: An error inside a coroutine doesn't escape `resume`: it returns `false` and the message, and the coroutine is dead. `wrap` passes the error on instead.
local co = coroutine.create(function()
  coroutine.yield('ok')
  error('broken', 0)
end)
coroutine.resume(co)
assert.are.same(___, {coroutine.resume(co)}, 'resume reports the error')
assert.are.equal(___, coroutine.status(co), 'and the coroutine is over')
local gen = coroutine.wrap(function() error('wrapped', 0) end)
assert.error_matches(gen, ___, 'wrap raises it')
assert.is_true(___, 'isyieldable: inside a coroutine, yes')
