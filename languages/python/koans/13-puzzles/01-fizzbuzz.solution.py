def fizzbuzz(n):
    return 'Fizz' * (n % 3 == 0) + 'Buzz' * (n % 5 == 0) or str(n)


assert fizzbuzz(9) == 'Fizz', 'a multiple of 3'
assert fizzbuzz(10) == 'Buzz', 'a multiple of 5'
assert fizzbuzz(30) == 'FizzBuzz', 'a multiple of both'
assert fizzbuzz(7) == '7', 'neither: the number itself'
assert [fizzbuzz(n) for n in range(1, 6)] == ['1', '2', 'Fizz', '4', 'Buzz'], 'the first five'
