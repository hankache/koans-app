<?php
[$first, $second] = [10, 20];
assertSame(20, $second, 'by position');
[, , $third] = [1, 2, 3];
assertSame(3, $third, 'skipping some');
['name' => $name, 'age' => $age] = ['age' => 36, 'name' => 'Ada'];
assertSame('Ada', $name, 'by key');
$x = 1;
$y = 2;
[$x, $y] = [$y, $x];
assertSame([2, 1], [$x, $y], 'a swap');
$total = 0;
foreach ([[1, 2], [3, 4]] as [$a, $b]) {
    $total += $a * $b;
}
assertSame(14, $total, 'in a foreach');
