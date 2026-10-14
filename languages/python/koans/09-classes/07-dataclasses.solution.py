from dataclasses import dataclass, field, FrozenInstanceError

@dataclass
class Point:
    x: int
    y: int = 0

assert Point(1) == Point(1, 0), 'y has a default; == compares fields'
assert repr(Point(1, 2)) == 'Point(x=1, y=2)', 'a readable repr'

@dataclass
class Bag:
    items: list = field(default_factory=list)

assert Bag().items == [], 'each Bag gets its own list'

@dataclass(frozen=True)
class Colour:
    name: str

def repaint():
    Colour('red').name = 'blue'

with pytest.raises(FrozenInstanceError):  # a frozen dataclass cannot change
    repaint()
