caught = []
try:
    raise ExceptionGroup('several', [ValueError('bad'), KeyError('k')])
except* ValueError as group:
    caught.append(len(group.exceptions))
except* KeyError:
    caught.append('key')
assert caught == [1, 'key'], 'each except* handles its kind'
eg = ExceptionGroup('many', [ValueError(1), TypeError(2), ValueError(3)])
values, rest = eg.split(ValueError)
assert len(values.exceptions) == 2, 'split takes out one kind'
assert type(rest.exceptions[0]) is TypeError, 'and leaves the rest'
with pytest.raises(ExceptionGroup):  # a kind no except* handles is raised again
    try:
        raise ExceptionGroup('x', [TypeError()])
    except* ValueError:
        pass
