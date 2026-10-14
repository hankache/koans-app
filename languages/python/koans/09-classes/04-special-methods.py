# title: Special methods
# intro: Methods with double underscores, like `__repr__`, `__eq__`, `__len__` and `__add__`, make objects work with Python's built-in operations.
class Money:
    def __init__(self, cents):
        self.cents = cents

    def __repr__(self):
        return f'Money({self.cents})'

    def __eq__(self, other):
        return self.cents == other.cents

    def __add__(self, other):
        return Money(self.cents + other.cents)

    def __lt__(self, other):
        return self.cents < other.cents

assert repr(Money(5)) == ___, '__repr__ is how it shows'
assert (Money(5) == Money(5)) == ___, '__eq__ defines ==, by value'
assert Money(1) + Money(2) == ___, '__add__ defines +'
assert max(Money(1), Money(7)) == ___, '__lt__ is enough for max'

class Deck:
    def __init__(self, cards):
        self.cards = cards

    def __len__(self):
        return len(self.cards)

    def __getitem__(self, i):
        return self.cards[i]

deck = Deck(['A', 'K', 'Q'])
assert len(deck) == ___, '__len__ defines len()'
assert deck[-1] == ___, '__getitem__ defines indexing'
assert list(deck) == ___, 'and with it, iteration'
