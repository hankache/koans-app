// title: The hierarchy
// intro: Everything throwable implements `Throwable`. `Exception` is for problems a program expects to handle; `Error` for mistakes in the code, like a type error. Catching `Exception` doesn't catch an `Error`.
<?php
assertInstanceOf(___, new TypeError(), 'TypeError is an Error');
assertInstanceOf(___, new InvalidArgumentException(), 'InvalidArgumentException is an Exception');
assertSame(___, get_parent_class(InvalidArgumentException::class), 'a LogicException, in fact');
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
assertSame(___, $result, 'Exception does not catch an Error');
