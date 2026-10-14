# title: Indexing and slicing
# intro: `s[i]` is one character, counting from 0, or from the end with negative numbers. `s[start:stop]` is a slice: it stops just before `stop`.
s = 'Python'
assert_equal(s[0], ___, 'the first character')
assert_equal(s[-1], ___, 'the last one')
assert_equal(s[1:4], ___, 'a slice stops before its end')
assert_equal(s[:2], ___, 'from the start')
assert_equal(s[::-1], ___, 'a step of -1 walks backwards')

def change_first():
    s[0] = 'J'

assert_raises(___, change_first, 'strings cannot be changed in place')
