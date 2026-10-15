// title: Slicing and merging
// intro: `array_slice` copies part of an array, `array_splice` cuts into it. `array_merge` appends lists and overwrites string keys; `+` keeps the left side's keys; `...` spreads arrays into a new one.
<?php
assertSame(___, array_slice([1, 2, 3, 4], 1, 2), 'a slice');
$a = [1, 2, 3, 4];
$removed = array_splice($a, 1, 2, ['x']);
assertSame(___, $a, 'splice cuts in place');
assertSame(___, array_merge([1, 2], [3]), 'array_merge appends lists');
assertSame(___, array_merge(['a' => 1], ['a' => 2]), 'and overwrites string keys');
assertSame(___, ['a' => 1] + ['a' => 2], '+ keeps the left side');
assertSame(___, [0, ...[1, 2], ...[3]], 'spread');
