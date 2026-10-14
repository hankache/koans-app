from collections import Counter, defaultdict, deque, namedtuple

counts = Counter('banana')
assert counts['a'] == 3, 'Counter counts'
assert counts.most_common(1) == [('a', 3)], 'and knows the most common'
groups = defaultdict(list)
groups['fruit'].append('fig')
assert groups['fruit'] == ['fig'], 'defaultdict made the list for us'
line = deque([2, 3])
line.appendleft(1)
assert list(line) == [1, 2, 3], 'a deque adds at the front too'
Point = namedtuple('Point', ['x', 'y'])
assert Point(1, 2).y == 2, 'a namedtuple names its fields'
