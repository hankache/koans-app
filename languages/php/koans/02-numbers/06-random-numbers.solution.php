<?php
$n = random_int(1, 6);
assertSame(true, $n >= 1 && $n <= 6, 'a die roll is in range');
$first = new Random\Randomizer(new Random\Engine\Mt19937(42));
$second = new Random\Randomizer(new Random\Engine\Mt19937(42));
assertSame($first->getInt(1, 100), $second->getInt(1, 100), 'the same seed, the same number');
$letters = (new Random\Randomizer(new Random\Engine\Mt19937(1)))->shuffleArray(['a', 'b', 'c']);
assertCount(3, $letters, 'shuffling keeps every item');
