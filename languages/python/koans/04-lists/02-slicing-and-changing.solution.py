letters = ['a', 'b', 'c', 'd', 'e']
assert letters[1:3] == ['b', 'c'], 'a slice'
letters[1:3] = ['X']
assert letters == ['a', 'X', 'd', 'e'], 'assigning to a slice replaces it'
del letters[0]
assert letters == ['X', 'd', 'e'], 'del removes an item'
letters[-1] = 'Z'
assert letters == ['X', 'd', 'Z'], 'assigning to an index replaces one item'
