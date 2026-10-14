def countdown(n):
    while n > 0:
        yield n
        n -= 1

assert list(countdown(3)) == [3, 2, 1], 'a generator yields values one by one'
gen = countdown(2)
assert type(gen).__name__ == 'generator', 'calling it makes a generator object'
assert next(gen) == 2, 'it runs up to the first yield'

def chain(*seqs):
    for seq in seqs:
        yield from seq

assert list(chain('ab', [1])) == ['a', 'b', 1], 'yield from yields everything from another iterable'
