# title: Recursion
# intro: A function can call itself, as long as some case stops it. `functools.cache` remembers results, which makes some recursive functions fast.
import functools

def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

assert factorial(5) == ___, 'factorial calls itself'

def flatten(items):
    result = []
    for item in items:
        result.extend(flatten(item) if isinstance(item, list) else [item])
    return result

assert flatten([1, [2, [3, 4]], 5]) == ___, 'recursion fits nested data'

@functools.cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

assert fib(80) == ___, 'with a cache, this returns at once'
