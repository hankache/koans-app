# title: Built-ins for iterables
# intro: `min`, `max` and `sorted` take a `key`; `sum` takes a start; `zip` with `strict=True` insists the iterables are the same length.
words = ['pear', 'fig', 'banana']
assert max(words, key=len) == ___, 'the longest'
assert min(words, key=len) == ___, 'the shortest'
assert sum([[1], [2]], start=[]) == ___, 'sum with a start can join lists'
with pytest.raises(___):  # strict zip wants equal lengths
    list(zip([1, 2], [1], strict=True))
assert dict(enumerate('ab')) == ___, 'pairs from enumerate make a dict'
