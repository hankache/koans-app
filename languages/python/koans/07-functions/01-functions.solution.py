def greet(name):
    """Says hello."""
    return f'Hello, {name}'

assert greet('Ada') == 'Hello, Ada', 'a function returns a value'
assert greet.__doc__ == 'Says hello.', 'a docstring documents it'

def min_max(items):
    return min(items), max(items)

low, high = min_max([3, 1, 2])
assert high == 3, 'several results come back as a tuple'
assert callable(greet) == True, 'functions are objects you can call'
