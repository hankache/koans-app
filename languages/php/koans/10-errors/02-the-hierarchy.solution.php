<?php
assertInstanceOf(Error::class, new TypeError(), 'TypeError is an Error');
assertInstanceOf(Exception::class, new InvalidArgumentException(), 'InvalidArgumentException is an Exception');
assertSame('LogicException', get_parent_class(InvalidArgumentException::class), 'a LogicException, in fact');
$result = 'not caught';
try {
    try {
        strlen([]);
    } catch (Exception) {
        $result = 'caught as Exception';
    }
} catch (Throwable $t) {
    $result = 'caught as ' . get_class($t);
}
assertSame('caught as TypeError', $result, 'Exception does not catch an Error');
