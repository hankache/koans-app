// title: Typed functions
// intro: Parameters and results can have types. In these koans (as in any file without `declare(strict_types=1)`) a scalar argument is converted when it can be: `'5'` is accepted as an `int`.
<?php
function add(int $a, int $b): int
{
    return $a + $b;
}
assertSame(___, add(2, 3), 'typed parameters');
assertSame(___, add('2', 3), "'2' is converted to an int");
assertThrows(___, fn() => add('two', 3), "'two' cannot be");
function nothing(): void {}
assertNull(___, 'a void function returns null');
