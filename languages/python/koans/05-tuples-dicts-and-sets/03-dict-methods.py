# title: Dict methods
# intro: `items()` gives key-value pairs, `pop()` removes a key, `setdefault()` reads a key or adds it, and `|` merges two dicts.
stock = {'tea': 3, 'cake': 5}
assert sorted(stock.items()) == ___, 'items are pairs'
assert stock.pop('cake') == ___, 'pop removes a key and gives its value'
assert stock.setdefault('jam', 0) == ___, 'setdefault adds a missing key'
assert stock.setdefault('tea', 99) == ___, 'and leaves an existing one alone'
merged = {'a': 1, 'b': 2} | {'b': 20, 'c': 3}
assert merged == ___, '| merges, the right side winning'
