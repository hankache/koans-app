const fizzbuzz = n => (n % 3 ? '' : 'Fizz') + (n % 5 ? '' : 'Buzz') || n;
expect(fizzbuzz(9), 'a multiple of 3').toBe('Fizz');
expect(fizzbuzz(10), 'a multiple of 5').toBe('Buzz');
expect(fizzbuzz(30), 'a multiple of both').toBe('FizzBuzz');
expect(fizzbuzz(7), 'neither: the number itself').toBe(7);
expect(Array.from({ length: 5 }, (_, i) => fizzbuzz(i + 1)), 'the first five').toEqual([1, 2, 'Fizz', 4, 'Buzz']);
