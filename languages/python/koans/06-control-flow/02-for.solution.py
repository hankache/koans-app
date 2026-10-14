total = 0
for n in range(1, 4):
    total += n
assert total == 6, 'for walks through a range'
assert list(enumerate('ab')) == [(0, 'a'), (1, 'b')], 'enumerate pairs positions with items'
assert list(enumerate('ab', start=1)) == [(1, 'a'), (2, 'b')], 'counting from 1'
assert list(zip([1, 2], 'xy')) == [(1, 'x'), (2, 'y')], 'zip walks side by side'
assert list(reversed([1, 2, 3])) == [3, 2, 1], 'reversed walks backwards'
