// title: FizzBuzz
// intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
const fizzbuzz = n => (n % 3 ? '' : 'Fizz') + (n % 5 ? '' : 'Buzz') || n;
expect(fizzbuzz(9), 'a multiple of 3').toBe(___);
expect(fizzbuzz(10), 'a multiple of 5').toBe(___);
expect(fizzbuzz(30), 'a multiple of both').toBe(___);
expect(fizzbuzz(7), 'neither: the number itself').toBe(___);
expect(Array.from({ length: 5 }, (_, i) => fizzbuzz(i + 1)), 'the first five').toEqual(___);
