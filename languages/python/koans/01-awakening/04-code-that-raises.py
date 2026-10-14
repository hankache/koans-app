# title: Code that raises
# intro: `with pytest.raises(SomeError):` expects the code inside to raise that exception. The comment on the `with` line describes the test.
with pytest.raises(___):  # dividing by zero
    1 / 0
with pytest.raises(___):  # a key the dictionary does not have
    {}['missing']
with pytest.raises(___):  # an index past the end of a list
    [1, 2, 3][10]
with pytest.raises(___):  # int() wants digits
    int('ten')
with pytest.raises(___):  # a string and a number do not add up
    'a' + 1
with pytest.raises(___):  # None has no upper()
    None.upper()
