// title: Sorting
// intro: Sorting functions sort the array in place. `sort` renumbers the keys, `asort` and `ksort` keep them; `usort` takes a comparison, often written with the spaceship operator `<=>`.
<?php
$n = [3, 1, 2];
sort($n);
assertSame(___, $n, 'sort sorts in place');
$ages = ['ada' => 36, 'alan' => 41, 'grace' => 85];
arsort($ages);
assertSame(___, array_keys($ages), 'arsort: by value, descending, keeping keys');
ksort($ages);
assertSame(___, array_key_first($ages), 'ksort: by key');
$words = ['pear', 'fig', 'banana'];
usort($words, fn($a, $b) => strlen($a) <=> strlen($b));
assertSame(___, $words, 'usort with <=>');
assertSame(___, 1 <=> 2, '<=> gives -1, 0 or 1');
