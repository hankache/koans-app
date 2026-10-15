// title: Callables
// intro: Functions are values: a closure, a string naming a function, `[$object, 'method']`, or the first-class callable syntax `strlen(...)`, which makes a `Closure` from any function or method.
<?php
$len = strlen(...);
assertSame(___, $len('hello'), 'strlen(...) is a Closure');
assertSame(___, array_map(intval(...), ['1', '2', '3']), 'passed to array_map');
assertSame(___, call_user_func('strtoupper', 'hi'), 'a function name as a string');
$compose = fn(callable ...$fs) => fn($x) => array_reduce($fs, fn($acc, $f) => $f($acc), $x);
$shout = $compose(trim(...), strtoupper(...), fn($s) => "$s!");
assertSame(___, $shout('  hey '), 'functions composed');
assertIsCallable(___, 'assertIsCallable');
