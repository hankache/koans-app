# title: Iteration
# intro: `iter()` gets an iterator from anything iterable, and `next()` takes its next value. When nothing is left, it raises `StopIteration`, which is how a `for` loop knows to stop.
it = iter([1, 2])
assert next(it) == ___, 'next takes the first value'
assert next(it) == ___, 'then the next'
with pytest.raises(___):  # nothing is left
    next(it)
assert next(iter([]), 'empty') == ___, 'next can give a default instead'
it = iter('abc')
next(it)
assert list(it) == ___, 'an iterator remembers where it was'
