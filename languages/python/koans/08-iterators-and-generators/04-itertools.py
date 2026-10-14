# title: itertools
# intro: `itertools` has building blocks for iterators: infinite counters, slicing, chaining, grouping, combinations and running totals.
from itertools import accumulate, chain, count, groupby, islice, product

assert list(islice(count(10), 3)) == ___, 'count never stops; islice takes a few'
assert list(chain([1], [2, 3])) == ___, 'chain joins iterables'
assert [k for k, _ in groupby('aabbbc')] == ___, 'groupby groups runs of equal items'
assert list(product('ab', [1, 2])) == ___, 'product makes every combination'
assert list(accumulate([1, 2, 3, 4])) == ___, 'accumulate keeps a running total'
