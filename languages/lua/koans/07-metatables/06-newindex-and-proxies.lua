-- title: __newindex and proxies
-- intro: `__newindex` runs when a missing key is assigned. With an empty proxy table in front of the real one, it can make tables read-only, or watch every change.
local function readonly(t)
  return setmetatable({}, {
    __index = t,
    __newindex = function(_, key) error('cannot set ' .. key, 2) end,
  })
end
local config = readonly({port = 80})
assert.are.equal(___, config.port, 'reads pass through')
assert.error_matches(function() config.port = 81 end, ___, 'writes are refused')
local log = {}
local watched = setmetatable({}, {
  __newindex = function(t, k, v)
    log[#log + 1] = k
    rawset(t, k, v)
  end,
})
watched.a = 1
watched.a = 2
assert.are.same(___, log, 'only a new key triggers __newindex')
