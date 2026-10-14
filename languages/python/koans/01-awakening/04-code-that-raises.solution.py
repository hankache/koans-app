with pytest.raises(ZeroDivisionError):  # dividing by zero
    1 / 0
with pytest.raises(KeyError):  # a key the dictionary does not have
    {}['missing']
with pytest.raises(IndexError):  # an index past the end of a list
    [1, 2, 3][10]
with pytest.raises(ValueError):  # int() wants digits
    int('ten')
with pytest.raises(TypeError):  # a string and a number do not add up
    'a' + 1
with pytest.raises(AttributeError):  # None has no upper()
    None.upper()
