import copy

a = [1, 2]
b = a
b.append(3)
assert a == [1, 2, 3], 'b is the same list'
c = a[:]
c.append(4)
assert a == [1, 2, 3], 'a slice is a new list'
nested = [[1], [2]]
shallow = list(nested)
shallow[0].append('!')
assert nested[0] == [1, '!'], 'a shallow copy shares the inner lists'
deep = copy.deepcopy(nested)
deep[1].append('?')
assert nested[1] == [2], 'a deep copy does not'
