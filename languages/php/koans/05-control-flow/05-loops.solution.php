<?php
$out = [];
foreach (['a' => 1, 'b' => 2] as $key => $value) {
    $out[] = "$key$value";
}
assertSame(['a1', 'b2'], $out, 'keys and values');
$nums = [1, 2, 3];
foreach ($nums as &$n) {
    $n *= 10;
}
unset($n);
assertSame([10, 20, 30], $nums, 'by reference, & changes the array');
$i = 0;
do {
    $i++;
} while ($i < 0);
assertSame(1, $i, 'do ... while runs at least once');
$pairs = [];
for ($a = 1; $a <= 3; $a++) {
    for ($b = 1; $b <= 3; $b++) {
        if ($b > $a) continue 2;
        $pairs[] = "$a$b";
    }
}
assertSame(['11', '21', '22', '31', '32', '33'], $pairs, 'continue 2 moves the outer loop on');
