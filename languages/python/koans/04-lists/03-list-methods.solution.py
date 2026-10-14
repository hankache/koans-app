items = [1, 2]
items.append([3, 4])
assert items == [1, 2, [3, 4]], 'append adds its argument as one item'
items = [1, 2]
items.extend([3, 4])
assert items == [1, 2, 3, 4], 'extend adds each item'
items.insert(0, 'start')
assert items[0] == 'start', 'insert puts an item at a position'
items.remove('start')
assert items == [1, 2, 3, 4], 'remove takes out the first equal item'
assert [5, 6, 5].index(5) == 0, 'index finds the first position'
assert [5, 6, 5].count(5) == 2, 'count counts equal items'
