// title: Keys and delegation
// intro: `yield $key => $value` yields pairs, and `yield from` hands over to another generator or array. Keys that repeat overwrite each other in `iterator_to_array` unless keys are dropped.
<?php
function pairs(): Generator
{
    yield 'a' => 1;
    yield 'b' => 2;
}
assertSame(___, iterator_to_array(pairs()), 'keys and values');
function letters(): Generator
{
    yield 'x';
    yield from ['y', 'z'];
}
assertSame(___, iterator_to_array(letters(), false), 'yield from, keys dropped');
assertSame(___, iterator_to_array(letters()), 'with keys, the array\'s 0 and 1 overwrite x');
