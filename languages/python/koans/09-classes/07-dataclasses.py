# title: Dataclasses
# intro: `@dataclass` writes `__init__`, `__repr__` and `__eq__` from the class's annotated fields. `frozen=True` makes instances that cannot change.
from dataclasses import dataclass, field, FrozenInstanceError

@dataclass
class Point:
    x: int
    y: int = 0

assert Point(1) == ___, 'y has a default; == compares fields'
assert repr(Point(1, 2)) == ___, 'a readable repr'

@dataclass
class Bag:
    items: list = field(default_factory=list)

assert Bag().items == ___, 'each Bag gets its own list'

@dataclass(frozen=True)
class Colour:
    name: str

def repaint():
    Colour('red').name = 'blue'

with pytest.raises(___):  # a frozen dataclass cannot change
    repaint()
