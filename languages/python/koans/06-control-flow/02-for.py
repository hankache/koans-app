# title: for
# intro: `for` walks through anything iterable. `enumerate` adds positions, `zip` walks two sequences side by side, and `reversed` walks backwards.
total = 0
for n in range(1, 4):
    total += n
assert total == ___, 'for walks through a range'
assert list(enumerate('ab')) == ___, 'enumerate pairs positions with items'
assert list(enumerate('ab', start=1)) == ___, 'counting from 1'
assert list(zip([1, 2], 'xy')) == ___, 'zip walks side by side'
assert list(reversed([1, 2, 3])) == ___, 'reversed walks backwards'
