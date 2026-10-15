local Account = {}
Account.__index = Account
function Account.new(balance)
  return setmetatable({balance = balance or 0}, Account)
end
function Account:deposit(amount)
  self.balance = self.balance + amount
end
local a = Account.new(100)
a:deposit(50)
assert.are.equal(150, a.balance, 'each object has its own balance')
assert.are.equal(0, Account.new().balance, 'with a default')
assert.are.equal(true, getmetatable(a) == Account, 'its metatable is the class')
assert.are.equal(nil, rawget(a, 'deposit'), 'methods live in the class, not the object')
