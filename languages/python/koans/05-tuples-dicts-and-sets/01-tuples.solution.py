point = (3, 4)
assert point[0] == 3, 'tuples index like lists'
assert type((1,)) is tuple, 'the comma makes a tuple'
assert (1) == 1, 'parentheses alone do not'
pair = 1, 2
assert pair == (1, 2), 'a bare comma makes one too'

def change():
    point[0] = 5

with pytest.raises(TypeError):  # tuples cannot change
    change()
assert len(()) == 0, 'an empty tuple'
