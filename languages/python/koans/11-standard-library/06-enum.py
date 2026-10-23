# title: enum
# intro: `Enum` defines a set of named values. Members compare by identity, know their name and value, and can be looked up by either.
from enum import Enum, auto

class Color(Enum):
    RED = 1
    GREEN = 2

assert Color(2) is ___, 'look up a member by value'
assert Color['RED'] is Color.RED, 'or by name'
assert Color.RED.name == ___, 'a member knows its name'
assert len(Color) == ___, 'an enum knows its members'

class Step(Enum):
    READ = auto()
    FILL = auto()

assert Step.FILL.value == ___, 'auto numbers them from 1'
