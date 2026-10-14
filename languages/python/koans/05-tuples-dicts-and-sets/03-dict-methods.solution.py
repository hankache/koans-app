stock = {'tea': 3, 'cake': 5}
assert sorted(stock.items()) == [('cake', 5), ('tea', 3)], 'items are pairs'
assert stock.pop('cake') == 5, 'pop removes a key and gives its value'
assert stock.setdefault('jam', 0) == 0, 'setdefault adds a missing key'
assert stock.setdefault('tea', 99) == 3, 'and leaves an existing one alone'
merged = {'a': 1, 'b': 2} | {'b': 20, 'c': 3}
assert merged == {'a': 1, 'b': 20, 'c': 3}, '| merges, the right side winning'
