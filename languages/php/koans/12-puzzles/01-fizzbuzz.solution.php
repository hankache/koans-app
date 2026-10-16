<?php
function fizzbuzz(int $n): string|int
{
    return ($n % 3 ? '' : 'Fizz') . ($n % 5 ? '' : 'Buzz') ?: $n;
}
assertSame('Fizz', fizzbuzz(9), 'a multiple of 3');
assertSame('Buzz', fizzbuzz(10), 'a multiple of 5');
assertSame('FizzBuzz', fizzbuzz(30), 'a multiple of both');
assertSame(7, fizzbuzz(7), 'neither: the number itself');
assertSame([1, 2, 'Fizz', 4, 'Buzz'], array_map('fizzbuzz', range(1, 5)), 'the first five');
