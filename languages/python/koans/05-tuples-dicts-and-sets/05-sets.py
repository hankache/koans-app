# title: Sets
# intro: A set holds each value once, in no particular order, and checks membership fast. Its operators are the ones from mathematics.
a = {1, 2, 3}
b = {3, 4}
assert a | b == ___, 'union: in either'
assert a & b == ___, 'intersection: in both'
assert a - b == ___, 'difference: in a but not in b'
assert a ^ b == ___, 'symmetric difference: in one but not both'
assert len({1, 1, 2}) == ___, 'duplicates collapse'
assert ({1, 2} <= a) == ___, '<= asks whether it is a subset'
assert type(set()) is ___, '{} is an empty dict, so an empty set is set()'
