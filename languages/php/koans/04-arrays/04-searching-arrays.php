// title: Searching arrays
// intro: `in_array` and `array_search` look for a value, strictly when told to; `array_key_exists` asks for a key; `array_find`, `array_any` and `array_all` test each item with a function.
<?php
$ids = [10, '20', 30];
assertSame(___, in_array(20, $ids), 'in_array compares with == by default');
assertSame(___, in_array(20, $ids, true), 'strictly, 20 is not "20"');
assertSame(___, array_search(30, $ids), 'array_search gives the key');
assertSame(___, array_find([5, 15, 25], fn($n) => $n > 10), 'array_find: the first match');
assertSame(___, array_any([1, 2, 3], fn($n) => $n > 2), 'array_any');
assertSame(___, array_all([1, 2, 3], fn($n) => $n > 2), 'array_all');
