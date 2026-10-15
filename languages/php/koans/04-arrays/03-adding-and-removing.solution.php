<?php
$stack = [1, 2];
array_push($stack, 3, 4);
assertSame(4, array_pop($stack), 'pop takes the last');
array_unshift($stack, 0);
assertSame(0, array_shift($stack), 'shift takes the first');
assertSame([1, 2, 3], $stack, 'what is left');
$list = ['a', 'b', 'c'];
unset($list[1]);
assertSame([0 => 'a', 2 => 'c'], $list, 'unset leaves a gap in the keys');
assertSame(['a', 'c'], array_values($list), 'array_values renumbers');
