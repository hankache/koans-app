# title: Dict comprehensions
# intro: Braces with `key: value` make a dict comprehension. `zip` pairs up two sequences, and `dict()` turns pairs into a dict.
assert {w: len(w) for w in ['hi', 'hey']} == ___, 'a dict comprehension'
assert dict(zip(['a', 'b'], [1, 2])) == ___, 'zip pairs keys with values'
prices = {'tea': 3, 'cake': 5}
assert {k: v * 2 for k, v in prices.items()} == ___, 'transform every value'
assert {v: k for k, v in prices.items()} == ___, 'swap keys and values'
