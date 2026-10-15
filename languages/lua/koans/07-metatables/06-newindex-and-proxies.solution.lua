local function readonly(t)
  return setmetatable({}, {
    __index = t,
    __newindex = function(_, key) error('cannot set ' .. key, 2) end,
  })
end
local config = readonly({port = 80})
assert.are.equal(80, config.port, 'reads pass through')
assert.error_matches(function() config.port = 81 end, 'cannot set port', 'writes are refused')
local log = {}
local watched = setmetatable({}, {
  __newindex = function(t, k, v)
    log[#log + 1] = k
    rawset(t, k, v)
  end,
})
watched.a = 1
watched.a = 2
assert.are.same({'a'}, log, 'only a new key triggers __newindex')
