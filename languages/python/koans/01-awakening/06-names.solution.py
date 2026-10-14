x = 10
x += 5
assert x == 15, '+= adds and assigns'
a, b = 1, 2
a, b = b, a
assert a == 2, 'swapping needs no temporary'
first = second = []
first.append('shared')
assert second == ['shared'], 'two names for one list'
x = 'now a string'
assert type(x) is str, 'a name can point at any type'
