# title: Copies
# intro: Assigning a list gives it another name. A slice or `list()` makes a shallow copy: a new list holding the same items. `copy.deepcopy` copies all the way down.
import copy

a = [1, 2]
b = a
b.append(3)
assert a == ___, 'b is the same list'
c = a[:]
c.append(4)
assert a == ___, 'a slice is a new list'
nested = [[1], [2]]
shallow = list(nested)
shallow[0].append('!')
assert nested[0] == ___, 'a shallow copy shares the inner lists'
deep = copy.deepcopy(nested)
deep[1].append('?')
assert nested[1] == ___, 'a deep copy does not'
