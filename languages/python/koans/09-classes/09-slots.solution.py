class Point:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x, self.y = x, y


p = Point(1, 2)
assert p.x + p.y == 3, 'slots hold the attributes'
with pytest.raises(AttributeError):  # there is no room for a new one
    p.z = 3
assert hasattr(p, '__dict__') is False, 'and no __dict__'


class Plain:
    pass


assert hasattr(Plain(), '__dict__') is True, 'an ordinary object has one'
