// title: try, catch and finally
// intro: `catch` handles an exception of a given class, or of several with `|`; `finally` always runs. The variable in `catch` can be left out when you don't need it.
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
assertSame(___, attempt(fn() => 1 % 0), 'caught, then finally');
assertSame(___, attempt(fn() => 5), 'no exception, still finally');
$caught = false;
try {
    throw new RuntimeException();
} catch (RuntimeException) {
    $caught = true;
}
assertTrue(___, 'catch without a variable');
