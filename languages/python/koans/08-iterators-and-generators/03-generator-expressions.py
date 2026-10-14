# title: Generator expressions
# intro: With parentheses instead of brackets, a comprehension becomes a generator expression: it makes values only as they are needed.
squares = (n * n for n in range(4))
assert next(squares) == ___, 'a generator expression is lazy'
assert sum(squares) == ___, 'and finishes where it left off: 1 + 4 + 9'
assert sum(n * n for n in range(4)) == ___, 'it can be an argument without extra parentheses'
assert any(n > 2 for n in [1, 3]) == ___, 'any stops at the first true value'
assert all(n > 0 for n in [1, 0]) == ___, 'all stops at the first false one'
