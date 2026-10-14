from itertools import accumulate, chain, count, groupby, islice, product

assert list(islice(count(10), 3)) == [10, 11, 12], 'count never stops; islice takes a few'
assert list(chain([1], [2, 3])) == [1, 2, 3], 'chain joins iterables'
assert [k for k, _ in groupby('aabbbc')] == ['a', 'b', 'c'], 'groupby groups runs of equal items'
assert list(product('ab', [1, 2])) == [('a', 1), ('a', 2), ('b', 1), ('b', 2)], 'product makes every combination'
assert list(accumulate([1, 2, 3, 4])) == [1, 3, 6, 10], 'accumulate keeps a running total'
