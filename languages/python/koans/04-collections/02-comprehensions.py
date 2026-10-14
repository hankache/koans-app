# title: Comprehensions
# intro: A comprehension builds a list from another sequence in one line: `[expression for item in sequence if condition]`. `range()` counts.
assert_equal(list(range(5)), ___, 'range stops before its end')
assert_equal(list(range(2, 8, 2)), ___, 'start, stop and step')
assert_equal([n * n for n in range(5)], ___, 'square each one')
assert_equal([n for n in range(10) if n % 3 == 0], ___, 'keep only some')
assert_equal(sum(range(101)), ___, 'sum adds them up')
assert_equal({w: len(w) for w in ['hi', 'hey']}, ___, 'braces make a dict comprehension')
