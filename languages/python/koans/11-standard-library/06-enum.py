# title: enum
# intro: `Enum` defines a set of named values. Members compare by identity, know their name and value, and can be looked up by either.
from enum import Enum, auto

class Colour(Enum):
    RED = 1
    GREEN = 2

assert Colour(2) is ___, 'look up a member by value'
assert Colour['RED'] is Colour.RED, 'or by name'
assert Colour.RED.name == ___, 'a member knows its name'
assert len(Colour) == ___, 'an enum knows its members'

class Step(Enum):
    READ = auto()
    FILL = auto()

assert Step.FILL.value == ___, 'auto numbers them from 1'
