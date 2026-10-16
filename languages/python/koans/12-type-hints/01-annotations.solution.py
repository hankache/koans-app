def greet(name: str, times: int = 1) -> str:
    return ('hi ' + name + ' ') * times


assert greet.__annotations__['times'] is int, 'annotations are kept'
assert greet.__annotations__['return'] is str, 'the result under return'


def double(x: int) -> int:
    return x * 2


assert double('ab') == 'abab', 'nothing checks them at run time'


class Point:
    x: int
    y: int = 0


assert list(Point.__annotations__) == ['x', 'y'], 'a class keeps its fields'
assert hasattr(Point, 'x') is False, 'an annotation alone makes no attribute'
