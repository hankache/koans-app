-- title: Weak tables
-- intro: A metatable's `__mode` makes a table's keys (`'k'`), values (`'v'`) or both weak: once nothing else refers to them, the garbage collector can remove their entries.
local function size(t)
  local n = 0
  for _ in pairs(t) do n = n + 1 end
  return n
end
local cache = setmetatable({}, {__mode = 'k'})
local key = {}
cache[key] = 'data'
assert.are.equal(___, size(cache), 'an entry stays while its key lives')
key = nil
collectgarbage()
assert.are.equal(___, size(cache), 'then the collector removes it')
local strong = {}
local other = {}
strong[other] = true
other = nil
collectgarbage()
assert.are.equal(___, size(strong), 'an ordinary table keeps its keys alive')
local values = setmetatable({}, {__mode = 'v'})
values[1] = {}
collectgarbage()
assert.are.equal(___, values[1], "with __mode 'v', the values are weak")
