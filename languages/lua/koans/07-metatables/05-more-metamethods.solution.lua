local Money = {}
Money.__index = Money
Money.__lt = function(a, b) return a.cents < b.cents end
Money.__le = function(a, b) return a.cents <= b.cents end
Money.__concat = function(a, b) return tostring(a) .. tostring(b) end
Money.__tostring = function(m) return ('$%.2f'):format(m.cents / 100) end
local function money(cents) return setmetatable({cents = cents}, Money) end
assert.is_true(money(150) < money(200), '__lt makes < work')
assert.are.equal('$1.50 total', money(150) .. ' total', '__concat makes .. work')
local Counter = setmetatable({n = 0}, {
  __call = function(self, step) self.n = self.n + (step or 1); return self.n end,
  __len = function(self) return self.n end,
})
Counter(5)
Counter()
assert.are.equal(6, #Counter, '__call and __len')
