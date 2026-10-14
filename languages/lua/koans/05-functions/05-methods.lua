-- title: Methods
-- intro: `obj:method(x)` is short for `obj.method(obj, x)`: the colon passes the table itself as the first argument, which a method defined with `:` calls `self`.
local account = {balance = 0}
function account:deposit(amount)
  self.balance = self.balance + amount
  return self.balance
end
assert.are.equal(___, account:deposit(10), 'the colon passes account as self')
assert.are.equal(___, account.deposit(account, 5), 'which you can also do by hand')
assert.are.equal(___, account.balance, 'self is the table itself')
