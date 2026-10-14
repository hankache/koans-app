it = iter([1, 2])
assert next(it) == 1, 'next takes the first value'
assert next(it) == 2, 'then the next'
with pytest.raises(StopIteration):  # nothing is left
    next(it)
assert next(iter([]), 'empty') == 'empty', 'next can give a default instead'
it = iter('abc')
next(it)
assert list(it) == ['b', 'c'], 'an iterator remembers where it was'
