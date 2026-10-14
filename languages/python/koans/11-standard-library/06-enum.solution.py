from enum import Enum, auto

class Colour(Enum):
    RED = 1
    GREEN = 2

assert Colour(2) is Colour.GREEN, 'look up a member by value'
assert Colour['RED'] is Colour.RED, 'or by name'
assert Colour.RED.name == 'RED', 'a member knows its name'
assert len(Colour) == 2, 'an enum knows its members'

class Step(Enum):
    READ = auto()
    FILL = auto()

assert Step.FILL.value == 2, 'auto numbers them from 1'
