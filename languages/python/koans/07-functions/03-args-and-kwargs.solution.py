def count(*args):
    return len(args)

assert count(1, 2, 3) == 3, '*args gathers positional arguments'

def show(**kwargs):
    return sorted(kwargs)

assert show(b=1, a=2) == ['a', 'b'], '**kwargs gathers keyword arguments'

def add(a, b, c):
    return a + b + c

assert add(*[1, 2, 3]) == 6, '* spreads a list into arguments'
assert add(**{'a': 1, 'b': 2, 'c': 3}) == 6, '** spreads a dict into keyword arguments'
