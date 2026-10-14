def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

tick = make_counter()
tick()
assert tick() == 2, 'the closure keeps its count'
assert make_counter()() == 1, 'each counter has its own'
adders = [lambda x, n=n: x + n for n in range(3)]
assert adders[2](10) == 12, 'a default argument captures each n'
