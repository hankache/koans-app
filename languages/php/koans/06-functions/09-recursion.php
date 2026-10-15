// title: Recursion
// intro: A function can call itself, as long as some case stops it. Recursion suits nested data, like a tree of arrays.
<?php
function factorial(int $n): int
{
    return $n <= 1 ? 1 : $n * factorial($n - 1);
}
assertSame(___, factorial(5), 'factorial');
function flatten(array $items): array
{
    $out = [];
    foreach ($items as $item) {
        is_array($item) ? array_push($out, ...flatten($item)) : $out[] = $item;
    }
    return $out;
}
assertSame(___, flatten([1, [2, [3]], 4]), 'flatten nested arrays');
$fib = function (int $n) use (&$fib): int {
    return $n < 2 ? $n : $fib($n - 1) + $fib($n - 2);
};
assertSame(___, $fib(10), 'a closure that calls itself, through use (&$fib)');
