-- title: xpcall
-- intro: `xpcall` is `pcall` with a handler, which runs where the error happened, so it can add context or a traceback before the stack unwinds.
local function handler(err)
  return 'handled: ' .. err
end
local ok, result = xpcall(function() error('boom', 0) end, handler)
assert.is_false(___, 'it failed')
assert.are.equal(___, result, 'and the handler shaped the message')
local fine, value = xpcall(function(a, b) return a + b end, handler, 2, 3)
assert.are.same(___, {fine, value}, 'arguments after the handler go to the function')
local _, trace = xpcall(function() error('deep', 0) end, debug.traceback)
assert.matches(___, trace, 'debug.traceback adds the stack')
