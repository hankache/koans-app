<?php
assertThrows(DivisionByZeroError::class, fn() => intdiv(1, 0), 'integer division by zero');
assertThrows(TypeError::class, fn() => strlen([]), 'a function given the wrong type');
assertThrows(ValueError::class, fn() => str_repeat('a', -1), 'a value out of range');
$e = assertThrows(Exception::class, fn() => throw new Exception('out of tea'), 'throw is an expression');
assertSame('out of tea', $e->getMessage(), 'assertThrows returns what was thrown');
