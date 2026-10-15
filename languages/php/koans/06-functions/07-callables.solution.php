<?php
$len = strlen(...);
assertSame(5, $len('hello'), 'strlen(...) is a Closure');
assertSame([1, 2, 3], array_map(intval(...), ['1', '2', '3']), 'passed to array_map');
assertSame('HI', call_user_func('strtoupper', 'hi'), 'a function name as a string');
$compose = fn(callable ...$fs) => fn($x) => array_reduce($fs, fn($acc, $f) => $f($acc), $x);
$shout = $compose(trim(...), strtoupper(...), fn($s) => "$s!");
assertSame('HEY!', $shout('  hey '), 'functions composed');
assertIsCallable($shout, 'assertIsCallable');
