from operator import add, attrgetter, itemgetter
from functools import reduce

people = [('Alan', 41), ('Ada', 36)]
assert sorted(people, key=itemgetter(1)) == [('Ada', 36), ('Alan', 41)], 'sort by the second item'
assert itemgetter(0, 1)('abc') == ('a', 'b'), 'several items at once'
assert reduce(add, [1, 2, 3]) == 6, 'add is +'

class P:
    def __init__(self, name):
        self.name = name

assert [p.name for p in sorted([P('b'), P('a')], key=attrgetter('name'))] == ['a', 'b'], 'sort by an attribute'
