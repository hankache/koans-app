<?php
$n = [3, 1, 2];
sort($n);
assertSame([1, 2, 3], $n, 'sort sorts in place');
$ages = ['ada' => 36, 'alan' => 41, 'grace' => 85];
arsort($ages);
assertSame(['grace', 'alan', 'ada'], array_keys($ages), 'arsort: by value, descending, keeping keys');
ksort($ages);
assertSame('ada', array_key_first($ages), 'ksort: by key');
$words = ['pear', 'fig', 'banana'];
usort($words, fn($a, $b) => strlen($a) <=> strlen($b));
assertSame(['fig', 'pear', 'banana'], $words, 'usort with <=>');
assertSame(-1, 1 <=> 2, '<=> gives -1, 0 or 1');
