// title: Errors
// intro: When something goes wrong PHP throws an exception or an error. `assertThrows(Class::class, fn() => …)` calls the function and wants it to throw that class. It's the koans' one addition to PHPUnit, whose test methods use `expectException`.
<?php
assertThrows(___, fn() => intdiv(1, 0), 'integer division by zero');
assertThrows(___, fn() => strlen([]), 'a function given the wrong type');
assertThrows(___, fn() => str_repeat('a', -1), 'a value out of range');
$e = assertThrows(Exception::class, fn() => throw new Exception('out of tea'), 'throw is an expression');
assertSame(___, $e->getMessage(), 'assertThrows returns what was thrown');
