// title: Sending values
// intro: `send` passes a value into a generator, where it becomes the result of the paused `yield`. A generator can also `return` a final value, read with `getReturn`.
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
assertSame(___, $gen->current(), 'the first yield');
assertSame(___, $gen->send(5), 'send gives a value to yield');
assertSame(___, $gen->send(3), 'and gets the next yield back');
$gen->send(null);
assertSame(___, $gen->getReturn(), 'the return value');
