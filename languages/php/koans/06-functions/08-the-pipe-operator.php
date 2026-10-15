// title: The pipe operator
// intro: PHP 8.5's pipe operator, `|>`, passes the value on its left to the callable on its right, so a chain of calls reads from left to right instead of inside out.
<?php
$result = '  Hello World  ' |> trim(...) |> strtolower(...) |> ucfirst(...);
assertSame(___, $result, 'left to right');
$nested = ucfirst(strtolower(trim('  Hello World  ')));
assertSame(___, $nested, 'the same as nested calls, read inside out');
$slug = 'Koans Are Fun' |> strtolower(...) |> (fn($s) => str_replace(' ', '-', $s));
assertSame(___, $slug, 'an arrow function, in parentheses, for extra arguments');
$sum = [1, 2, 3, 4] |> (fn($a) => array_filter($a, fn($n) => $n % 2 === 0)) |> array_sum(...);
assertSame(___, $sum, 'arrays flow through too');
