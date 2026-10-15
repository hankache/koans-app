<?php
$ids = [10, '20', 30];
assertSame(true, in_array(20, $ids), 'in_array compares with == by default');
assertSame(false, in_array(20, $ids, true), 'strictly, 20 is not "20"');
assertSame(2, array_search(30, $ids), 'array_search gives the key');
assertSame(15, array_find([5, 15, 25], fn($n) => $n > 10), 'array_find: the first match');
assertSame(true, array_any([1, 2, 3], fn($n) => $n > 2), 'array_any');
assertSame(false, array_all([1, 2, 3], fn($n) => $n > 2), 'array_all');
