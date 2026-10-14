# title: *args and **kwargs
# intro: `*args` gathers extra positional arguments into a tuple and `**kwargs` gathers extra keyword arguments into a dict. In a call, `*` and `**` spread them back out.
def count(*args):
    return len(args)

assert count(1, 2, 3) == ___, '*args gathers positional arguments'

def show(**kwargs):
    return sorted(kwargs)

assert show(b=1, a=2) == ___, '**kwargs gathers keyword arguments'

def add(a, b, c):
    return a + b + c

assert add(*[1, 2, 3]) == ___, '* spreads a list into arguments'
assert add(**{'a': 1, 'b': 2, 'c': 3}) == ___, '** spreads a dict into keyword arguments'
