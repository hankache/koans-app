-- title: To-be-closed variables
-- intro: A `local name <close>` holds a value whose `__close` metamethod runs when the variable goes out of scope, error or not. It's Lua's way to always clean up.
local log = {}
local function resource(name)
  return setmetatable({}, {__close = function(_, err)
    log[#log + 1] = name .. (err and ' after an error' or ' closed')
  end})
end
do
  local a <close> = resource('a')
  local b <close> = resource('b')
  log[#log + 1] = 'working'
end
assert.are.same(___, log, 'closed when the block ends, last first')
log = {}
pcall(function()
  local f <close> = resource('file')
  error('boom')
end)
assert.are.same(___, log, 'closed when an error leaves the block too')
local ok = pcall(function()
  local x <close> = 42
end)
assert.are.equal(___, ok, 'a value without __close cannot be closed')
local none <close> = nil
assert.are.equal(___, none, 'but nil is allowed, and closes nothing')
