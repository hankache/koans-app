# title: Lambdas and higher-order functions
# intro: `lambda` makes a small function in one expression. Functions are values: they can be passed to `sorted`, `map` and `filter`, or returned from other functions.
double = lambda n: n * 2
assert double(4) == ___, 'a lambda is a function'
assert list(map(double, [1, 2])) == ___, 'map applies it to each item'
assert list(filter(lambda n: n > 1, [1, 2, 3])) == ___, 'filter keeps some'
assert sorted(['bb', 'a', 'ccc'], key=lambda s: -len(s)) == ___, 'a key function'

def twice(f):
    return lambda x: f(f(x))

assert twice(double)(3) == ___, 'a function that returns a function'
