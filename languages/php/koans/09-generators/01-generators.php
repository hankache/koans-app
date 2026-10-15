// title: Generators
// intro: A function containing `yield` returns a `Generator`. Each value is produced only when asked for, so a generator can describe a long, or endless, sequence.
<?php
function countdown(int $from): Generator
{
    for ($i = $from; $i > 0; $i--) {
        yield $i;
    }
}
assertSame(___, iterator_to_array(countdown(3)), 'yield values one by one');
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
assertSame(___, $firstFour, 'an endless generator: take what you need');
assertInstanceOf(___, countdown(1), 'a generator can be traversed');
