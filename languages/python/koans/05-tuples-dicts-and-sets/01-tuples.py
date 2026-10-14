# title: Tuples
# intro: A tuple is a sequence that cannot change. The comma makes the tuple; the parentheses are often optional.
point = (3, 4)
assert point[0] == ___, 'tuples index like lists'
assert type((1,)) is ___, 'the comma makes a tuple'
assert (1) == ___, 'parentheses alone do not'
pair = 1, 2
assert pair == ___, 'a bare comma makes one too'

def change():
    point[0] = 5

with pytest.raises(___):  # tuples cannot change
    change()
assert len(()) == ___, 'an empty tuple'
