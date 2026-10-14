import functools

def shout(func):
    @functools.wraps(func)
    def wrapper(*args):
        return func(*args).upper()
    return wrapper

@shout
def greet(name):
    return f'hi {name}'

assert greet('ada') == 'HI ADA', 'the decorator wraps the function'
assert greet.__name__ == 'greet', 'wraps keeps its name'
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
assert calls == ['add'], 'a decorator can record calls'
