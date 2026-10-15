<?php
function add(int $a, int $b): int
{
    return $a + $b;
}
assertSame(5, add(2, 3), 'typed parameters');
assertSame(5, add('2', 3), "'2' is converted to an int");
assertThrows(TypeError::class, fn() => add('two', 3), "'two' cannot be");
function nothing(): void {}
assertNull(nothing(), 'a void function returns null');
