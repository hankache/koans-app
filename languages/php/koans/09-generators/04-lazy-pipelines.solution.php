<?php
function numbers(): Generator
{
    for ($i = 1; ; $i++) {
        yield $i;
    }
}
function mapG(callable $f, iterable $items): Generator
{
    foreach ($items as $item) yield $f($item);
}
function filterG(callable $f, iterable $items): Generator
{
    foreach ($items as $item) if ($f($item)) yield $item;
}
function take(int $n, iterable $items): array
{
    $out = [];
    foreach ($items as $item) {
        if (count($out) === $n) break;
        $out[] = $item;
    }
    return $out;
}
$squares = mapG(fn($n) => $n * $n, filterG(fn($n) => $n % 2 === 1, numbers()));
assertSame([1, 9, 25], take(3, $squares), 'odd squares, from an endless source');
