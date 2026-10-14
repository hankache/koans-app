# title: Dictionaries
# intro: A dict maps keys to values. `get()` returns `None`, or a default you give, when a key is missing; a dict keeps its keys in the order they were added.
ages = {'Ada': 36, 'Alan': 41}
assert_equal(ages['Ada'], ___, 'look up a key')
assert_is(ages.get('Grace'), ___, 'get gives None for a missing key')
assert_equal(ages.get('Grace', 0), ___, 'or the default you give it')
assert_equal('Alan' in ages, ___, 'in looks at the keys')
ages['Grace'] = 85
assert_equal(len(ages), ___, 'assigning to a new key adds it')
assert_equal(list(ages), ___, 'keys stay in the order they were added')
assert_equal(sorted(ages.values()), ___, 'values() gives the values')
