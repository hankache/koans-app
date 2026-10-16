import random
import statistics

data = [2, 4, 4, 4, 5, 5, 7, 9]
assert statistics.mean(data) == 5, 'the mean'
assert statistics.median([1, 3, 2, 10]) == 2.5, 'an even count averages the middle two'
assert statistics.mode(data) == 4, 'the most common value'
assert statistics.pstdev(data) == 2.0, 'the standard deviation'
random.seed(7)
first = [random.randint(1, 6) for _ in range(5)]
random.seed(7)
again = [random.randint(1, 6) for _ in range(5)]
assert (first == again) is True, 'the same seed gives the same numbers'
assert sorted(random.sample(range(5), 5)) == [0, 1, 2, 3, 4], 'sample picks without repeats'
