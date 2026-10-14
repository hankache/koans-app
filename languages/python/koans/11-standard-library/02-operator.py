# title: operator
# intro: `operator` has the operators as functions: `itemgetter` and `attrgetter` make good keys for sorting, and `add` or `mul` work with `reduce`.
from operator import add, attrgetter, itemgetter
from functools import reduce

people = [('Alan', 41), ('Ada', 36)]
assert sorted(people, key=itemgetter(1)) == ___, 'sort by the second item'
assert itemgetter(0, 1)('abc') == ___, 'several items at once'
assert reduce(add, [1, 2, 3]) == ___, 'add is +'

class P:
    def __init__(self, name):
        self.name = name

assert [p.name for p in sorted([P('b'), P('a')], key=attrgetter('name'))] == ___, 'sort by an attribute'
