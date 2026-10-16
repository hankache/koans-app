// title: Type juggling
// intro: Without `strict_types`, PHP converts values to fit: a numeric string passed to an `int` parameter becomes an int, and arithmetic converts too. A string that isn't a number is refused.
<?php
function twice(int $n): int
{
    return $n * 2;
}
assertSame(___, twice('5'), 'a numeric string fits an int parameter');
assertSame(___, '5' + 3, 'arithmetic converts numeric strings');
assertSame(___, '5.5' + 3, 'to a float when needed');
assertThrows(___, fn() => twice('five'), 'a string that is not a number is refused');
assertSame(___, 0 == 'a', 'since PHP 8, 0 does not equal a non-numeric string');
assertSame(___, '1e3' == '1000', 'two numeric strings compare as numbers');
