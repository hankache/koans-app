// title: References
// intro: Arguments are passed by value: a function gets a copy, even of an array. `&` passes a reference, so the function can change the caller's variable.
<?php
function addOne(array $items): array
{
    $items[] = 1;
    return $items;
}
$list = [];
addOne($list);
assertSame(___, $list, 'arrays are copied');
function addOneInPlace(array &$items): void
{
    $items[] = 1;
}
addOneInPlace($list);
assertSame(___, $list, '& changes the original');
$a = 1;
$b = &$a;
$b = 5;
assertSame(___, $a, '$b is another name for $a');
