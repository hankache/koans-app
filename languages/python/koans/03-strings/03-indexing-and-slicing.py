# title: Indexing and slicing
# intro: `s[i]` is one character, counting from 0, or from the end with negative numbers. `s[start:stop]` is a slice that stops just before `stop`; a third number is a step.
s = 'Python'
assert s[0] == ___, 'the first character'
assert s[-1] == ___, 'the last one'
assert s[1:4] == ___, 'a slice stops before its end'
assert s[:2] == ___, 'from the start'
assert s[::2] == ___, 'every second character'
assert s[::-1] == ___, 'a step of -1 walks backwards'
assert s[10:] == ___, 'a slice past the end is just empty'

def change_first():
    s[0] = 'J'

with pytest.raises(___):  # strings cannot be changed in place
    change_first()
