s = 'Python'
assert_equal(s[0], 'P', 'the first character')
assert_equal(s[-1], 'n', 'the last one')
assert_equal(s[1:4], 'yth', 'a slice stops before its end')
assert_equal(s[:2], 'Py', 'from the start')
assert_equal(s[::-1], 'nohtyP', 'a step of -1 walks backwards')

def change_first():
    s[0] = 'J'

assert_raises(TypeError, change_first, 'strings cannot be changed in place')
