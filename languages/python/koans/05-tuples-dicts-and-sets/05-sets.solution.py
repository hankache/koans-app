a = {1, 2, 3}
b = {3, 4}
assert a | b == {1, 2, 3, 4}, 'union: in either'
assert a & b == {3}, 'intersection: in both'
assert a - b == {1, 2}, 'difference: in a but not in b'
assert a ^ b == {1, 2, 4}, 'symmetric difference: in one but not both'
assert len({1, 1, 2}) == 2, 'duplicates collapse'
assert ({1, 2} <= a) == True, '<= asks whether it is a subset'
assert type(set()) is set, '{} is an empty dict, so an empty set is set()'
