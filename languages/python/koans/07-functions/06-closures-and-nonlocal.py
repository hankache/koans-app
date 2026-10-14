# title: Closures and nonlocal
# intro: A nested function keeps the variables around it. To assign to one of them, it must say `nonlocal`.
def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

tick = make_counter()
tick()
assert tick() == ___, 'the closure keeps its count'
assert make_counter()() == ___, 'each counter has its own'
adders = [lambda x, n=n: x + n for n in range(3)]
assert adders[2](10) == ___, 'a default argument captures each n'
