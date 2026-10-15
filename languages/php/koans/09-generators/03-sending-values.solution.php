<?php
function runningTotal(): Generator
{
    $total = 0;
    while (true) {
        $n = yield $total;
        if ($n === null) {
            return $total;
        }
        $total += $n;
    }
}
$gen = runningTotal();
assertSame(0, $gen->current(), 'the first yield');
assertSame(5, $gen->send(5), 'send gives a value to yield');
assertSame(8, $gen->send(3), 'and gets the next yield back');
$gen->send(null);
assertSame(8, $gen->getReturn(), 'the return value');
