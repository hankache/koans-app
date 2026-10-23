<?php
function twice(int $n): int
{
    return $n * 2;
}
assertSame(10, twice('5'), 'a numeric string fits an int parameter');
assertSame(8, '5' + 3, 'arithmetic converts numeric strings');
assertSame(8.5, '5.5' + 3, 'to a float when needed');
assertThrows(TypeError::class, fn() => twice('five'), 'a string that is not a number is refused');
assertSame(false, 0 == 'a', 'a number never equals a non-numeric string');
assertSame(true, '1e3' == '1000', 'two numeric strings compare as numbers');
