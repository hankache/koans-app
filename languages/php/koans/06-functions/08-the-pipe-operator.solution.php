<?php
$result = '  Hello World  ' |> trim(...) |> strtolower(...) |> ucfirst(...);
assertSame('Hello world', $result, 'left to right');
$nested = ucfirst(strtolower(trim('  Hello World  ')));
assertSame($result, $nested, 'the same as nested calls, read inside out');
$slug = 'Koans Are Fun' |> strtolower(...) |> (fn($s) => str_replace(' ', '-', $s));
assertSame('koans-are-fun', $slug, 'an arrow function, in parentheses, for extra arguments');
$sum = [1, 2, 3, 4] |> (fn($a) => array_filter($a, fn($n) => $n % 2 === 0)) |> array_sum(...);
assertSame(6, $sum, 'arrays flow through too');
