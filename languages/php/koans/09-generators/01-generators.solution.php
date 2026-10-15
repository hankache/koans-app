<?php
function countdown(int $from): Generator
{
    for ($i = $from; $i > 0; $i--) {
        yield $i;
    }
}
assertSame([3, 2, 1], iterator_to_array(countdown(3)), 'yield values one by one');
function naturals(): Generator
{
    $n = 1;
    while (true) {
        yield $n++;
    }
}
$firstFour = [];
foreach (naturals() as $n) {
    if ($n > 4) break;
    $firstFour[] = $n;
}
assertSame([1, 2, 3, 4], $firstFour, 'an endless generator: take what you need');
assertInstanceOf(Traversable::class, countdown(1), 'a generator can be traversed');
