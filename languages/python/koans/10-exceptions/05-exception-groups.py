# title: Exception groups
# intro: An `ExceptionGroup` carries several exceptions at once. `except*` handles the ones of a kind and lets the others go on; `split` divides a group in two.
caught = []
try:
    raise ExceptionGroup('several', [ValueError('bad'), KeyError('k')])
except* ValueError as group:
    caught.append(len(group.exceptions))
except* KeyError:
    caught.append('key')
assert caught == ___, 'each except* handles its kind'
eg = ExceptionGroup('many', [ValueError(1), TypeError(2), ValueError(3)])
values, rest = eg.split(ValueError)
assert len(values.exceptions) == ___, 'split takes out one kind'
assert type(rest.exceptions[0]) is ___, 'and leaves the rest'
with pytest.raises(___):  # a kind no except* handles is raised again
    try:
        raise ExceptionGroup('x', [TypeError()])
    except* ValueError:
        pass
