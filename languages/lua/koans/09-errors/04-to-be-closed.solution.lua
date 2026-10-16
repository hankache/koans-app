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
assert.are.same({'working', 'b closed', 'a closed'}, log, 'closed when the block ends, last first')
log = {}
pcall(function()
  local f <close> = resource('file')
  error('boom')
end)
assert.are.same({'file after an error'}, log, 'closed when an error leaves the block too')
local ok = pcall(function()
  local x <close> = 42
end)
assert.are.equal(false, ok, 'a value without __close cannot be closed')
local none <close> = nil
assert.are.equal(nil, none, 'but nil is allowed, and closes nothing')
