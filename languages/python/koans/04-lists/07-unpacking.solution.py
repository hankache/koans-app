x, y = (3, 4)
assert x == 3, 'the items are taken in order'
first, *rest = [1, 2, 3]
assert rest == [2, 3], 'the starred name takes the rest, as a list'
*start, last = 'abc'
assert start == ['a', 'b'], 'the star can come first'
(a, b), c = (1, 2), 3
assert b == 2, 'nested unpacking'
total = 0
for name, score in [('Ada', 3), ('Alan', 4)]:
    total += score
assert total == 7, 'unpacking in a for loop'
