from functools import lru_cache, partial, reduce

assert reduce(lambda a, b: a * b, [1, 2, 3, 4]) == 24, 'reduce folds a list'
from_binary = partial(int, base=2)
assert from_binary('101') == 5, 'partial fixes base=2'

@lru_cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(30)
assert fib.cache_info().misses == 31, 'each of fib(0) to fib(30) was computed once'
