assert {w: len(w) for w in ['hi', 'hey']} == {'hi': 2, 'hey': 3}, 'a dict comprehension'
assert dict(zip(['a', 'b'], [1, 2])) == {'a': 1, 'b': 2}, 'zip pairs keys with values'
prices = {'tea': 3, 'cake': 5}
assert {k: v * 2 for k, v in prices.items()} == {'tea': 6, 'cake': 10}, 'transform every value'
assert {v: k for k, v in prices.items()} == {3: 'tea', 5: 'cake'}, 'swap keys and values'
