<?php
assertSame([2, 3], array_slice([1, 2, 3, 4], 1, 2), 'a slice');
$a = [1, 2, 3, 4];
$removed = array_splice($a, 1, 2, ['x']);
assertSame([1, 'x', 4], $a, 'splice cuts in place');
assertSame([1, 2, 3], array_merge([1, 2], [3]), 'array_merge appends lists');
assertSame(['a' => 2], array_merge(['a' => 1], ['a' => 2]), 'and overwrites string keys');
assertSame(['a' => 1], ['a' => 1] + ['a' => 2], '+ keeps the left side');
assertSame([0, 1, 2, 3], [0, ...[1, 2], ...[3]], 'spread');
