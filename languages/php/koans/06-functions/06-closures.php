// title: Closures
// intro: An anonymous function captures outside variables only through `use`, by value unless written `&$var`. Arrow functions, `fn`, capture what they use automatically, by value.
<?php
$factor = 3;
$times = function (int $n) use ($factor): int {
    return $n * $factor;
};
$factor = 10;
assertSame(___, $times(2), 'use copies the value when the closure is made');
$count = 0;
$increment = function () use (&$count): void {
    $count++;
};
$increment();
$increment();
assertSame(___, $count, 'use (&$count) shares the variable');
$offset = 100;
$shift = fn(int $n): int => $n + $offset;
assertSame(___, $shift(5), 'fn captures automatically');
$counter = function () {
    static $calls = 0;
    return ++$calls;
};
$counter();
assertSame(___, $counter(), 'a static variable survives between calls');
