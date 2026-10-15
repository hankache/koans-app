// title: Adding and removing
// intro: `array_push` and `array_pop` work at the end, `array_unshift` and `array_shift` at the start; `unset` removes a key and leaves the others' keys alone.
<?php
$stack = [1, 2];
array_push($stack, 3, 4);
assertSame(___, array_pop($stack), 'pop takes the last');
array_unshift($stack, 0);
assertSame(___, array_shift($stack), 'shift takes the first');
assertSame(___, $stack, 'what is left');
$list = ['a', 'b', 'c'];
unset($list[1]);
assertSame(___, $list, 'unset leaves a gap in the keys');
assertSame(___, array_values($list), 'array_values renumbers');
