# title: Functions
# intro: `def` defines a function. Without `return` it returns `None`; returning several values returns a tuple.
def greet(name):
    """Says hello."""
    return f'Hello, {name}'

assert greet('Ada') == ___, 'a function returns a value'
assert greet.__doc__ == ___, 'a docstring documents it'

def min_max(items):
    return min(items), max(items)

low, high = min_max([3, 1, 2])
assert high == ___, 'several results come back as a tuple'
assert callable(greet) == ___, 'functions are objects you can call'
