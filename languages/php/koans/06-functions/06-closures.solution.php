<?php
$factor = 3;
$times = function (int $n) use ($factor): int {
    return $n * $factor;
};
$factor = 10;
assertSame(6, $times(2), 'use copies the value when the closure is made');
$count = 0;
$increment = function () use (&$count): void {
    $count++;
};
$increment();
$increment();
assertSame(2, $count, 'use (&$count) shares the variable');
$offset = 100;
$shift = fn(int $n): int => $n + $offset;
assertSame(105, $shift(5), 'fn captures automatically');
$counter = function () {
    static $calls = 0;
    return ++$calls;
};
$counter();
assertSame(2, $counter(), 'a static variable survives between calls');
