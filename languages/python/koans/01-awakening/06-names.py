# title: Names
# intro: A variable is a name for an object. Assigning gives a name to a value; the same name can later point at a value of another type.
x = 10
x += 5
assert x == ___, '+= adds and assigns'
a, b = 1, 2
a, b = b, a
assert a == ___, 'swapping needs no temporary'
first = second = []
first.append('shared')
assert second == ___, 'two names for one list'
x = 'now a string'
assert type(x) is ___, 'a name can point at any type'
