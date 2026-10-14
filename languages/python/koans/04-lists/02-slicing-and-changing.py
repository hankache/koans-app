# title: Slicing and changing
# intro: Slices read a part of a list, and assigning to a slice replaces that part, even with a different number of items. `del` removes items.
letters = ['a', 'b', 'c', 'd', 'e']
assert letters[1:3] == ___, 'a slice'
letters[1:3] = ['X']
assert letters == ___, 'assigning to a slice replaces it'
del letters[0]
assert letters == ___, 'del removes an item'
letters[-1] = 'Z'
assert letters == ___, 'assigning to an index replaces one item'
