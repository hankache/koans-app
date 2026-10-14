class InsufficientFunds(Exception):
    def __init__(self, needed):
        super().__init__(f'need {needed} more')
        self.needed = needed

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFunds(amount - balance)
    return balance - amount

assert withdraw(10, 3) == 7, 'no problem'
with pytest.raises(InsufficientFunds):  # too much
    withdraw(10, 30)
with pytest.raises(InsufficientFunds, match='need 20'):  # match checks the message
    withdraw(10, 30)
try:
    withdraw(1, 5)
except InsufficientFunds as error:
    short = error.needed
assert short == 4, 'the exception carries the shortfall'
