# title: Dictionaries
# intro: A dict maps keys to values. Reading a missing key raises `KeyError`; `get()` returns `None`, or a default you give.
ages = {'Ada': 36, 'Alan': 41}
assert ages['Ada'] == ___, 'look up a key'
with pytest.raises(___):  # a missing key
    ages['Grace']
assert ages.get('Grace') is ___, 'get gives None for a missing key'
assert ages.get('Grace', 0) == ___, 'or the default you give it'
assert ('Alan' in ages) == ___, 'in looks at the keys'
ages['Grace'] = 85
assert len(ages) == ___, 'assigning to a new key adds it'
assert list(ages) == ___, 'keys stay in the order they were added'
