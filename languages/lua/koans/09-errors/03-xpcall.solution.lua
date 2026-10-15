local function handler(err)
  return 'handled: ' .. err
end
local ok, result = xpcall(function() error('boom', 0) end, handler)
assert.is_false(ok, 'it failed')
assert.are.equal('handled: boom', result, 'and the handler shaped the message')
local fine, value = xpcall(function(a, b) return a + b end, handler, 2, 3)
assert.are.same({true, 5}, {fine, value}, 'arguments after the handler go to the function')
local _, trace = xpcall(function() error('deep', 0) end, debug.traceback)
assert.matches('stack traceback', trace, 'debug.traceback adds the stack')
