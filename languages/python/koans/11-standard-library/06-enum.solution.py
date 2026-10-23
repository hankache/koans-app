from enum import Enum, auto

class Color(Enum):
    RED = 1
    GREEN = 2

assert Color(2) is Color.GREEN, 'look up a member by value'
assert Color['RED'] is Color.RED, 'or by name'
assert Color.RED.name == 'RED', 'a member knows its name'
assert len(Color) == 2, 'an enum knows its members'

class Step(Enum):
    READ = auto()
    FILL = auto()

assert Step.FILL.value == 2, 'auto numbers them from 1'
