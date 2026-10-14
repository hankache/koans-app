# title: if
# intro: `if`, `elif` and `else` choose what runs. A conditional expression, `a if condition else b`, chooses between two values.
def size(n):
    if n < 10:
        return 'small'
    elif n < 100:
        return 'medium'
    else:
        return 'large'

assert size(5) == ___, 'the first condition that holds wins'
assert size(50) == ___, 'elif is tried next'
assert size(500) == ___, 'else takes the rest'
assert ('even' if 4 % 2 == 0 else 'odd') == ___, 'a conditional expression'
