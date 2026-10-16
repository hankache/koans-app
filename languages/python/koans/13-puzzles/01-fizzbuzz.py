# title: FizzBuzz
# intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
def fizzbuzz(n):
    return 'Fizz' * (n % 3 == 0) + 'Buzz' * (n % 5 == 0) or str(n)


assert fizzbuzz(9) == ___, 'a multiple of 3'
assert fizzbuzz(10) == ___, 'a multiple of 5'
assert fizzbuzz(30) == ___, 'a multiple of both'
assert fizzbuzz(7) == ___, 'neither: the number itself'
assert [fizzbuzz(n) for n in range(1, 6)] == ___, 'the first five'
