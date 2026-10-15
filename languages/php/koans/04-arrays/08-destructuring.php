// title: Destructuring
// intro: `[$a, $b] = $array` takes items out by position, and `['key' => $var] = $array` by key. It also swaps variables and works in `foreach`.
<?php
[$first, $second] = [10, 20];
assertSame(___, $second, 'by position');
[, , $third] = [1, 2, 3];
assertSame(___, $third, 'skipping some');
['name' => $name, 'age' => $age] = ['age' => 36, 'name' => 'Ada'];
assertSame(___, $name, 'by key');
$x = 1;
$y = 2;
[$x, $y] = [$y, $x];
assertSame(___, [$x, $y], 'a swap');
$total = 0;
foreach ([[1, 2], [3, 4]] as [$a, $b]) {
    $total += $a * $b;
}
assertSame(___, $total, 'in a foreach');
