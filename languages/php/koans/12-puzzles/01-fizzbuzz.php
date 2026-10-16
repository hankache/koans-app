// title: FizzBuzz
// intro: The classic: count from 1, but say "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for both. Read this version and predict what it says.
<?php
function fizzbuzz(int $n): string|int
{
    return ($n % 3 ? '' : 'Fizz') . ($n % 5 ? '' : 'Buzz') ?: $n;
}
assertSame(___, fizzbuzz(9), 'a multiple of 3');
assertSame(___, fizzbuzz(10), 'a multiple of 5');
assertSame(___, fizzbuzz(30), 'a multiple of both');
assertSame(___, fizzbuzz(7), 'neither: the number itself');
assertSame(___, array_map('fizzbuzz', range(1, 5)), 'the first five');
