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

assert repr(Money(5)) == 'Money(5)', '__repr__ is how it shows'
assert (Money(5) == Money(5)) == True, '__eq__ defines ==, by value'
assert Money(1) + Money(2) == Money(3), '__add__ defines +'
assert max(Money(1), Money(7)) == Money(7), '__lt__ is enough for max'

class Deck:
    def __init__(self, cards):
        self.cards = cards

    def __len__(self):
        return len(self.cards)

    def __getitem__(self, i):
        return self.cards[i]

deck = Deck(['A', 'K', 'Q'])
assert len(deck) == 3, '__len__ defines len()'
assert deck[-1] == 'Q', '__getitem__ defines indexing'
assert list(deck) == ['A', 'K', 'Q'], 'and with it, iteration'
