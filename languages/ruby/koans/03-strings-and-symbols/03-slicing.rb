# title: Slicing
# intro: `s[i]` is one character, counting from 0, or from the end with negative numbers. `s[range]` and `s[start, length]` are slices; past the end, there's `nil`.
s = 'Ruby koans'
assert_equal ___, s[0], 'the first character'
assert_equal ___, s[-1], 'the last one'
assert_equal ___, s[0..3], 'a range of positions'
assert_equal ___, s[5, 4], 'a start and a length'
assert_equal ___, s.index('k'), 'where something first appears'
assert_equal ___, s[100], 'past the end there is nothing'
