# title: Generators
# intro: A function with `yield` is a generator: calling it returns an iterator, and each `next` runs the function up to its next `yield`.
def countdown(n):
    while n > 0:
        yield n
        n -= 1

assert list(countdown(3)) == ___, 'a generator yields values one by one'
gen = countdown(2)
assert type(gen).__name__ == ___, 'calling it makes a generator object'
assert next(gen) == ___, 'it runs up to the first yield'

def chain(*seqs):
    for seq in seqs:
        yield from seq

assert list(chain('ab', [1])) == ___, 'yield from yields everything from another iterable'
