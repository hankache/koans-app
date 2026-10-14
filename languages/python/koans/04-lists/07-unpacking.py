# title: Unpacking
# intro: Assigning to several names takes a sequence apart. A starred name takes whatever is left, and unpacking works in `for` loops too.
x, y = (3, 4)
assert x == ___, 'the items are taken in order'
first, *rest = [1, 2, 3]
assert rest == ___, 'the starred name takes the rest, as a list'
*start, last = 'abc'
assert start == ___, 'the star can come first'
(a, b), c = (1, 2), 3
assert b == ___, 'nested unpacking'
total = 0
for name, score in [('Ada', 3), ('Alan', 4)]:
    total += score
assert total == ___, 'unpacking in a for loop'
