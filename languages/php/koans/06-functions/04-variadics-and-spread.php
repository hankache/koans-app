// title: Variadics and spread
// intro: `...$args` gathers the remaining arguments into an array; at a call, `...` spreads an array into arguments, and string keys become named arguments.
<?php
function total(int ...$numbers): int
{
    return array_sum($numbers);
}
assertSame(___, total(1, 2, 3), '...$numbers gathers');
assertSame(___, total(), 'even none');
assertSame(___, total(...[4, 5]), '... spreads an array');
function point(int $x, int $y): string
{
    return "($x, $y)";
}
assertSame(___, point(...['y' => 2, 'x' => 1]), 'string keys become named arguments');
