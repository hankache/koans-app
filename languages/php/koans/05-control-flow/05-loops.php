// title: Loops
// intro: `foreach` walks arrays, with keys if you want them, and by reference with `&`. `for`, `while` and `do … while` count and repeat; `break 2` and `continue 2` reach outer loops.
<?php
$out = [];
foreach (['a' => 1, 'b' => 2] as $key => $value) {
    $out[] = "$key$value";
}
assertSame(___, $out, 'keys and values');
$nums = [1, 2, 3];
foreach ($nums as &$n) {
    $n *= 10;
}
unset($n);
assertSame(___, $nums, 'by reference, & changes the array');
$i = 0;
do {
    $i++;
} while ($i < 0);
assertSame(___, $i, 'do ... while runs at least once');
$pairs = [];
for ($a = 1; $a <= 3; $a++) {
    for ($b = 1; $b <= 3; $b++) {
        if ($b > $a) continue 2;
        $pairs[] = "$a$b";
    }
}
assertSame(___, $pairs, 'continue 2 moves the outer loop on');
