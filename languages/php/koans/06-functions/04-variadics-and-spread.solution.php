<?php
function total(int ...$numbers): int
{
    return array_sum($numbers);
}
assertSame(6, total(1, 2, 3), '...$numbers gathers');
assertSame(0, total(), 'even none');
assertSame(9, total(...[4, 5]), '... spreads an array');
function point(int $x, int $y): string
{
    return "($x, $y)";
}
assertSame('(1, 2)', point(...['y' => 2, 'x' => 1]), 'string keys become named arguments');
