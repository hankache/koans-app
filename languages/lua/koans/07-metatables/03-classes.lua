-- title: Classes
-- intro: Lua has no classes, but a table can play one: it holds the methods, it's the `__index` of its objects, and a `new` function makes them.
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
assert.are.equal(___, a.balance, 'each object has its own balance')
assert.are.equal(___, Account.new().balance, 'with a default')
assert.are.equal(___, getmetatable(a) == Account, 'its metatable is the class')
assert.are.equal(___, rawget(a, 'deposit'), 'methods live in the class, not the object')
