# title: The collections module
# intro: `collections` has specialised containers: `Counter` counts things, `defaultdict` fills in missing keys, `deque` adds and removes at both ends, and `namedtuple` names a tuple's fields.
from collections import Counter, defaultdict, deque, namedtuple

counts = Counter('banana')
assert counts['a'] == ___, 'Counter counts'
assert counts.most_common(1) == ___, 'and knows the most common'
groups = defaultdict(list)
groups['fruit'].append('fig')
assert groups['fruit'] == ___, 'defaultdict made the list for us'
line = deque([2, 3])
line.appendleft(1)
assert list(line) == ___, 'a deque adds at the front too'
Point = namedtuple('Point', ['x', 'y'])
assert Point(1, 2).y == ___, 'a namedtuple names its fields'
