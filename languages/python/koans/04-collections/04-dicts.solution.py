ages = {'Ada': 36, 'Alan': 41}
assert_equal(ages['Ada'], 36, 'look up a key')
assert_is(ages.get('Grace'), None, 'get gives None for a missing key')
assert_equal(ages.get('Grace', 0), 0, 'or the default you give it')
assert_equal('Alan' in ages, True, 'in looks at the keys')
ages['Grace'] = 85
assert_equal(len(ages), 3, 'assigning to a new key adds it')
assert_equal(list(ages), ['Ada', 'Alan', 'Grace'], 'keys stay in the order they were added')
assert_equal(sorted(ages.values()), [36, 41, 85], 'values() gives the values')
