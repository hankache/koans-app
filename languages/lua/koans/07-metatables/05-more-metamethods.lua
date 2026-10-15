-- title: More metamethods
-- intro: Metamethods change how a table behaves with other operations too: `__call` makes it callable, `__len` answers `#`, `__lt` and `__le` compare, and `__concat` joins.
local Money = {}
Money.__index = Money
Money.__lt = function(a, b) return a.cents < b.cents end
Money.__le = function(a, b) return a.cents <= b.cents end
Money.__concat = function(a, b) return tostring(a) .. tostring(b) end
Money.__tostring = function(m) return ('$%.2f'):format(m.cents / 100) end
local function money(cents) return setmetatable({cents = cents}, Money) end
assert.is_true(___, '__lt makes < work')
assert.are.equal(___, money(150) .. ' total', '__concat makes .. work')
local Counter = setmetatable({n = 0}, {
  __call = function(self, step) self.n = self.n + (step or 1); return self.n end,
  __len = function(self) return self.n end,
})
Counter(5)
Counter()
assert.are.equal(___, #Counter, '__call and __len')
