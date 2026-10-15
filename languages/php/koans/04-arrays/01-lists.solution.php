<?php
$fruits = ['apple', 'banana'];
$fruits[] = 'cherry';
assertSame('cherry', $fruits[2], '[] = appends');
assertCount(3, $fruits, 'count');
assertSame(true, array_is_list($fruits), 'keys 0, 1, 2: a list');
assertSame('apple', array_first($fruits), 'array_first, new in PHP 8.5');
assertSame('cherry', array_last($fruits), 'and array_last');
assertSame([0, 2, 4, 6], range(0, 6, 2), 'range builds a list');
