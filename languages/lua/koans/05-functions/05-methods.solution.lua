local account = {balance = 0}
function account:deposit(amount)
  self.balance = self.balance + amount
  return self.balance
end
assert.are.equal(10, account:deposit(10), 'the colon passes account as self')
assert.are.equal(15, account.deposit(account, 5), 'which you can also do by hand')
assert.are.equal(15, account.balance, 'self is the table itself')
