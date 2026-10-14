import functools

def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

assert factorial(5) == 120, 'factorial calls itself'

def flatten(items):
    result = []
    for item in items:
        result.extend(flatten(item) if isinstance(item, list) else [item])
    return result

assert flatten([1, [2, [3, 4]], 5]) == [1, 2, 3, 4, 5], 'recursion fits nested data'

@functools.cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

assert fib(80) == 23416728348467685, 'with a cache, this returns at once'
