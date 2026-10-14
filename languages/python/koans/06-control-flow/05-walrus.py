# title: The walrus
# intro: `:=` assigns a value inside an expression, so a value can be computed once and then used right away.
data = [1, 2, 3, 4]
if (n := len(data)) > 3:
    message = f'{n} items'
assert message == ___, 'n is assigned and tested at once'
assert [y for x in data if (y := x * 10) > 20] == ___, 'compute once, filter and keep'
lines = iter(['a', 'b', ''])
seen = []
while (line := next(lines)):
    seen.append(line)
assert seen == ___, 'read until an empty line'
