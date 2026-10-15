<?php
function pairs(): Generator
{
    yield 'a' => 1;
    yield 'b' => 2;
}
assertSame(['a' => 1, 'b' => 2], iterator_to_array(pairs()), 'keys and values');
function letters(): Generator
{
    yield 'x';
    yield from ['y', 'z'];
}
assertSame(['x', 'y', 'z'], iterator_to_array(letters(), false), 'yield from, keys dropped');
assertSame(['y', 'z'], iterator_to_array(letters()), 'with keys, the array\'s 0 and 1 overwrite x');
