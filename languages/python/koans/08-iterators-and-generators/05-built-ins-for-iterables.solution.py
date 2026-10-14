words = ['pear', 'fig', 'banana']
assert max(words, key=len) == 'banana', 'the longest'
assert min(words, key=len) == 'fig', 'the shortest'
assert sum([[1], [2]], start=[]) == [1, 2], 'sum with a start can join lists'
with pytest.raises(ValueError):  # strict zip wants equal lengths
    list(zip([1, 2], [1], strict=True))
assert dict(enumerate('ab')) == {0: 'a', 1: 'b'}, 'pairs from enumerate make a dict'
