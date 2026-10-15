// title: Random numbers
// intro: `random_int` gives an unpredictable integer in a range. A `Random\Randomizer` with a seeded engine gives the same sequence every time, which tests need.
<?php
$n = random_int(1, 6);
assertSame(___, $n >= 1 && $n <= 6, 'a die roll is in range');
$first = new Random\Randomizer(new Random\Engine\Mt19937(42));
$second = new Random\Randomizer(new Random\Engine\Mt19937(42));
assertSame(___, $second->getInt(1, 100), 'the same seed, the same number');
$letters = (new Random\Randomizer(new Random\Engine\Mt19937(1)))->shuffleArray(['a', 'b', 'c']);
assertCount(___, $letters, 'shuffling keeps every item');
