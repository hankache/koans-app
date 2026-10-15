<?php
function addOne(array $items): array
{
    $items[] = 1;
    return $items;
}
$list = [];
addOne($list);
assertSame([], $list, 'arrays are copied');
function addOneInPlace(array &$items): void
{
    $items[] = 1;
}
addOneInPlace($list);
assertSame([1], $list, '& changes the original');
$a = 1;
$b = &$a;
$b = 5;
assertSame(5, $a, '$b is another name for $a');
