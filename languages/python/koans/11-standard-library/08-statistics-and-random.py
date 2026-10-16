# title: statistics and random
# intro: `statistics` has the usual measures of a set of numbers. `random` makes pseudo-random choices: seeding it with the same number repeats the same choices.
import random
import statistics

data = [2, 4, 4, 4, 5, 5, 7, 9]
assert statistics.mean(data) == ___, 'the mean'
assert statistics.median([1, 3, 2, 10]) == ___, 'an even count averages the middle two'
assert statistics.mode(data) == ___, 'the most common value'
assert statistics.pstdev(data) == ___, 'the standard deviation'
random.seed(7)
first = [random.randint(1, 6) for _ in range(5)]
random.seed(7)
again = [random.randint(1, 6) for _ in range(5)]
assert (first == again) is ___, 'the same seed gives the same numbers'
assert sorted(random.sample(range(5), 5)) == ___, 'sample picks without repeats'
