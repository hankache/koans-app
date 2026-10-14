# title: Comprehensions
# intro: A comprehension builds a list from another sequence in one line: `[expression for item in sequence if condition]`. `range()` counts.
assert list(range(5)) == ___, 'range stops before its end'
assert list(range(2, 8, 2)) == ___, 'start, stop and step'
assert [n * n for n in range(5)] == ___, 'square each one'
assert [n for n in range(10) if n % 3 == 0] == ___, 'keep only some'
assert [(x, y) for x in 'ab' for y in [1, 2]] == ___, 'two loops, the outer first'
assert [[0] * 2 for _ in range(2)] == ___, 'a list of lists'
