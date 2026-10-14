def size(n):
    if n < 10:
        return 'small'
    elif n < 100:
        return 'medium'
    else:
        return 'large'

assert size(5) == 'small', 'the first condition that holds wins'
assert size(50) == 'medium', 'elif is tried next'
assert size(500) == 'large', 'else takes the rest'
assert ('even' if 4 % 2 == 0 else 'odd') == 'even', 'a conditional expression'
