data = [1, 2, 3, 4]
if (n := len(data)) > 3:
    message = f'{n} items'
assert message == '4 items', 'n is assigned and tested at once'
assert [y for x in data if (y := x * 10) > 20] == [30, 40], 'compute once, filter and keep'
lines = iter(['a', 'b', ''])
seen = []
while (line := next(lines)):
    seen.append(line)
assert seen == ['a', 'b'], 'read until an empty line'
