# title: functools
# intro: `functools` has tools for functions: `reduce` folds a sequence into one value, `partial` fixes some arguments, and `lru_cache` remembers results.
from functools import lru_cache, partial, reduce

assert reduce(lambda a, b: a * b, [1, 2, 3, 4]) == ___, 'reduce folds a list'
from_binary = partial(int, base=2)
assert from_binary('101') == ___, 'partial fixes base=2'

@lru_cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(30)
assert fib.cache_info().misses == ___, 'each of fib(0) to fib(30) was computed once'
