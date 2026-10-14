# title: Raising
# intro: `raise` throws an exception. Your own exceptions are classes that inherit from `Exception`, and can carry information.
class InsufficientFunds(Exception):
    def __init__(self, needed):
        super().__init__(f'need {needed} more')
        self.needed = needed

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(amount - balance)
    return balance - amount

assert withdraw(10, 3) == ___, 'no problem'
with pytest.raises(___):  # too much
    withdraw(10, 30)
with pytest.raises(InsufficientFunds, match=___):  # match checks the message
    withdraw(10, 30)
try:
    withdraw(1, 5)
except InsufficientFunds as error:
    short = error.needed
assert short == ___, 'the exception carries the shortfall'
