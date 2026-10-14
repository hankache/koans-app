# title: Code that raises
# intro: `assert_raises` calls a function and wants it to raise the given exception. `lambda` makes a small function on the spot, so the code runs inside the assertion.
assert_raises(___, lambda: 1 / 0, 'dividing by zero')
assert_raises(___, lambda: {}['missing'], 'a key the dictionary does not have')
assert_raises(___, lambda: [1, 2, 3][10], 'an index past the end of a list')
assert_raises(___, lambda: int('ten'), 'int() wants digits')
assert_raises(___, lambda: 'a' + 1, 'a string and a number do not add up')
