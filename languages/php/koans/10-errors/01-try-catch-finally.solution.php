<?php
function attempt(callable $f): array
{
    $log = [];
    try {
        $log[] = $f();
    } catch (DivisionByZeroError | ValueError $e) {
        $log[] = get_class($e);
    } finally {
        $log[] = 'done';
    }
    return $log;
}
assertSame(['DivisionByZeroError', 'done'], attempt(fn() => 1 % 0), 'caught, then finally');
assertSame([5, 'done'], attempt(fn() => 5), 'no exception, still finally');
$caught = false;
try {
    throw new RuntimeException();
} catch (RuntimeException) {
    $caught = true;
}
assertTrue($caught, 'catch without a variable');
