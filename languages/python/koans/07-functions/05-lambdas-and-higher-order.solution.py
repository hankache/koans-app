double = lambda n: n * 2
assert double(4) == 8, 'a lambda is a function'
assert list(map(double, [1, 2])) == [2, 4], 'map applies it to each item'
assert list(filter(lambda n: n > 1, [1, 2, 3])) == [2, 3], 'filter keeps some'
assert sorted(['bb', 'a', 'ccc'], key=lambda s: -len(s)) == ['ccc', 'bb', 'a'], 'a key function'

def twice(f):
    return lambda x: f(f(x))

assert twice(double)(3) == 12, 'a function that returns a function'
