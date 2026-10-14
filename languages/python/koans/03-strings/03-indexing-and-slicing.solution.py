s = 'Python'
assert s[0] == 'P', 'the first character'
assert s[-1] == 'n', 'the last one'
assert s[1:4] == 'yth', 'a slice stops before its end'
assert s[:2] == 'Py', 'from the start'
assert s[::2] == 'Pto', 'every second character'
assert s[::-1] == 'nohtyP', 'a step of -1 walks backwards'
assert s[10:] == '', 'a slice past the end is just empty'

def change_first():
    s[0] = 'J'

with pytest.raises(TypeError):  # strings cannot be changed in place
    change_first()
