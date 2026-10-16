# title: Slots
# intro: `__slots__` lists the only attributes an object may have. It stores them compactly, without a `__dict__`, so a typo can't add a new attribute by accident.
class Point:
    __slots__ = ('x', 'y')

    def __init__(self, x, y):
        self.x, self.y = x, y


p = Point(1, 2)
assert p.x + p.y == ___, 'slots hold the attributes'
with pytest.raises(___):  # there is no room for a new one
    p.z = 3
assert hasattr(p, '__dict__') is ___, 'and no __dict__'


class Plain:
    pass


assert hasattr(Plain(), '__dict__') is ___, 'an ordinary object has one'
