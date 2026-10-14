# title: List methods
# intro: `append` adds one item and `extend` adds each item of another list. `insert`, `remove`, `index` and `count` work by position or by value.
items = [1, 2]
items.append([3, 4])
assert items == ___, 'append adds its argument as one item'
items = [1, 2]
items.extend([3, 4])
assert items == ___, 'extend adds each item'
items.insert(0, 'start')
assert items[0] == ___, 'insert puts an item at a position'
items.remove('start')
assert items == ___, 'remove takes out the first equal item'
assert [5, 6, 5].index(5) == ___, 'index finds the first position'
assert [5, 6, 5].count(5) == ___, 'count counts equal items'
