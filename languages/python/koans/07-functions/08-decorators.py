# title: Decorators
# intro: A decorator is a function that takes a function and returns a new one. `@name` above a `def` applies it. `functools.wraps` keeps the original's name.
import functools

def shout(func):
    @functools.wraps(func)
    def wrapper(*args):
        return func(*args).upper()
    return wrapper

@shout
def greet(name):
    return f'hi {name}'

assert greet('ada') == ___, 'the decorator wraps the function'
assert greet.__name__ == ___, 'wraps keeps its name'
calls = []

def logged(func):
    def wrapper(*args):
        calls.append(func.__name__)
        return func(*args)
    return wrapper

@logged
def add(a, b):
    return a + b

add(1, 2)
assert calls == ___, 'a decorator can record calls'
