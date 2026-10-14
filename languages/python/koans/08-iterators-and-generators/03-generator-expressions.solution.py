squares = (n * n for n in range(4))
assert next(squares) == 0, 'a generator expression is lazy'
assert sum(squares) == 14, 'and finishes where it left off: 1 + 4 + 9'
assert sum(n * n for n in range(4)) == 14, 'it can be an argument without extra parentheses'
assert any(n > 2 for n in [1, 3]) == True, 'any stops at the first true value'
assert all(n > 0 for n in [1, 0]) == False, 'all stops at the first false one'
