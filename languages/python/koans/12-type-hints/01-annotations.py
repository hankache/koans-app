# title: Annotations
# intro: Annotations describe the types a function expects and returns. Python keeps them in `__annotations__` but doesn't check them when it runs: that's the job of tools like type checkers.
def greet(name: str, times: int = 1) -> str:
    return ('hi ' + name + ' ') * times


assert greet.__annotations__['times'] is ___, 'annotations are kept'
assert greet.__annotations__['return'] is ___, 'the result under return'


def double(x: int) -> int:
    return x * 2


assert double('ab') == ___, 'nothing checks them at run time'


class Point:
    x: int
    y: int = 0


assert list(Point.__annotations__) == ___, 'a class keeps its fields'
assert hasattr(Point, 'x') is ___, 'an annotation alone makes no attribute'
