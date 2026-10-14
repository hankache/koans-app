ages = {'Ada': 36, 'Alan': 41}
assert ages['Ada'] == 36, 'look up a key'
with pytest.raises(KeyError):  # a missing key
    ages['Grace']
assert ages.get('Grace') is None, 'get gives None for a missing key'
assert ages.get('Grace', 0) == 0, 'or the default you give it'
assert ('Alan' in ages) == True, 'in looks at the keys'
ages['Grace'] = 85
assert len(ages) == 3, 'assigning to a new key adds it'
assert list(ages) == ['Ada', 'Alan', 'Grace'], 'keys stay in the order they were added'
