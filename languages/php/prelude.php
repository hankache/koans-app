<?php
// Run before every koan. The build turns it into one line that evals it (see node.mjs), so the
// koan's line numbers shift by exactly one; functions and classes it declares are global. Never
// write the closing tag in a comment here: in PHP, it ends PHP mode even inside a // comment.
//
// The assertions are PHPUnit's, as its global functions (assertSame($expected, $actual, $message)),
// and like Raku's Test module they print TAP: a failing assertion reports itself and the koan
// carries on, so every blank can be checked. Each failure also reports the learner's line as
// "# at web line N". Parameters are untyped, so a blank (an object) never trips a type check.

/** ___: a unique value. Any assertion given it fails, whatever the assertion. */
final class KoanBlank
{
    public function __toString(): string
    {
        return '___';
    }
}

define('___', new KoanBlank());

// Warnings and notices (an undefined variable, say) stop the koan with their line, as errors.
set_error_handler(function (int $severity, string $message, string $file, int $line): bool {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

final class Koan
{
    public static int $tests = 0;

    /** The koan's line that made this call: the first frame in /koan.php below the prelude. */
    public static function line(): int
    {
        foreach (debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS) as $frame) {
            if (($frame['file'] ?? '') === '/koan.php' && $frame['line'] > 1) {
                return $frame['line'];
            }
        }
        return 0;
    }

    public static function report(bool $ok, $message, array $diag = []): bool
    {
        self::$tests++;
        $message = (string) $message;
        echo ($ok ? 'ok ' : 'not ok ') . self::$tests . ($message !== '' ? " - $message" : '') . "\n";
        if (!$ok) {
            $err = fopen('php://stderr', 'w');
            foreach ($diag as $line) {
                fwrite($err, "# $line\n");
            }
            fwrite($err, '# at web line ' . self::line() . "\n");
        }
        return $ok;
    }

    public static function blank(...$values): bool
    {
        foreach ($values as $value) {
            if ($value instanceof KoanBlank) {
                return true;
            }
        }
        return false;
    }

    public static function compare(bool $ok, $expected, $actual, $message): bool
    {
        return self::report($ok, $message, ['expected: ' . self::show($expected), '     got: ' . self::show($actual)]);
    }

    public static function isType(string $type, bool $ok, $actual, $message): bool
    {
        if (self::blank($actual)) return self::report(false, $message);
        return self::report($ok, $message, ["expected: $type", '     got: ' . get_debug_type($actual)]);
    }

    /** A value written the way you'd write it in PHP: 'text', [1, 2], ['a' => 1], null. */
    public static function show($value, int $depth = 0): string
    {
        if ($value instanceof KoanBlank) {
            return '___';
        }
        if ($value === null) {
            return 'null';
        }
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }
        if (is_float($value)) {
            return var_export($value, true);
        }
        if (is_int($value)) {
            return (string) $value;
        }
        if (is_string($value)) {
            return preg_match('/[\x00-\x1f]/', $value)
                ? '"' . addcslashes($value, "\0..\37\"\\\$") . '"'
                : "'" . addcslashes($value, "'\\") . "'";
        }
        if (is_array($value)) {
            if ($depth > 3) {
                return '[…]';
            }
            $parts = [];
            foreach ($value as $k => $v) {
                $parts[] = array_is_list($value) ? self::show($v, $depth + 1) : self::show($k) . ' => ' . self::show($v, $depth + 1);
            }
            return '[' . implode(', ', $parts) . ']';
        }
        if ($value instanceof UnitEnum) {
            return get_class($value) . '::' . $value->name;
        }
        if ($value instanceof Closure) {
            return 'Closure';
        }
        if (is_object($value)) {
            $props = get_object_vars($value);
            if (!$props || $depth > 3) {
                return get_class($value);
            }
            $parts = [];
            foreach ($props as $k => $v) {
                $parts[] = "$k: " . self::show($v, $depth + 1);
            }
            return get_class($value) . ' {' . implode(', ', $parts) . '}';
        }
        return get_debug_type($value);
    }
}

// --- Equality

/** Passes when $actual === $expected: the same type and value (for objects, the same object). */
function assertSame($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::compare($expected === $actual, $expected, $actual, $message);
}

function assertNotSame($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($expected !== $actual, $message, ["didn't want: " . Koan::show($expected)]);
}

/** Passes when $actual == $expected: equal after PHP's type juggling. */
function assertEquals($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::compare($expected == $actual, $expected, $actual, $message);
}

function assertNotEquals($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($expected != $actual, $message, ["didn't want: " . Koan::show($expected)]);
}

/** Passes when the numbers are within $delta of each other. */
function assertEqualsWithDelta($expected, $actual, $delta, $message = ''): bool
{
    if (Koan::blank($expected, $actual, $delta)) return Koan::report(false, $message);
    return Koan::compare(abs($expected - $actual) <= $delta, $expected, $actual, $message);
}

// --- Truth and null

function assertTrue($condition, $message = ''): bool
{
    if (Koan::blank($condition)) return Koan::report(false, $message);
    return Koan::compare($condition === true, true, $condition, $message);
}

function assertFalse($condition, $message = ''): bool
{
    if (Koan::blank($condition)) return Koan::report(false, $message);
    return Koan::compare($condition === false, false, $condition, $message);
}

function assertNull($actual, $message = ''): bool
{
    if (Koan::blank($actual)) return Koan::report(false, $message);
    return Koan::compare($actual === null, null, $actual, $message);
}

function assertNotNull($actual, $message = ''): bool
{
    if (Koan::blank($actual)) return Koan::report(false, $message);
    return Koan::report($actual !== null, $message, ['expected: a value', '     got: null']);
}

function assertEmpty($actual, $message = ''): bool
{
    if (Koan::blank($actual)) return Koan::report(false, $message);
    return Koan::report(empty($actual), $message, ['expected: something empty', '     got: ' . Koan::show($actual)]);
}

function assertNotEmpty($actual, $message = ''): bool
{
    if (Koan::blank($actual)) return Koan::report(false, $message);
    return Koan::report(!empty($actual), $message, ['expected: something not empty', '     got: ' . Koan::show($actual)]);
}

// --- Comparison

function assertGreaterThan($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($actual > $expected, $message, [Koan::show($actual) . ' > ' . Koan::show($expected) . ' is false']);
}

function assertGreaterThanOrEqual($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($actual >= $expected, $message, [Koan::show($actual) . ' >= ' . Koan::show($expected) . ' is false']);
}

function assertLessThan($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($actual < $expected, $message, [Koan::show($actual) . ' < ' . Koan::show($expected) . ' is false']);
}

function assertLessThanOrEqual($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($actual <= $expected, $message, [Koan::show($actual) . ' <= ' . Koan::show($expected) . ' is false']);
}

// --- Collections

/** Passes when $haystack has $expectedCount items. */
function assertCount($expectedCount, $haystack, $message = ''): bool
{
    if (Koan::blank($expectedCount, $haystack)) return Koan::report(false, $message);
    $count = is_countable($haystack) ? count($haystack) : iterator_count($haystack);
    return Koan::compare($count === $expectedCount, $expectedCount, $count, $message);
}

/** Passes when $haystack (an array or iterable) contains $needle, compared with ===. */
function assertContains($needle, $haystack, $message = ''): bool
{
    if (Koan::blank($needle, $haystack)) return Koan::report(false, $message);
    $items = is_array($haystack) ? $haystack : iterator_to_array($haystack, false);
    return Koan::report(in_array($needle, $items, true), $message, [Koan::show($haystack) . ' does not contain ' . Koan::show($needle)]);
}

function assertNotContains($needle, $haystack, $message = ''): bool
{
    if (Koan::blank($needle, $haystack)) return Koan::report(false, $message);
    $items = is_array($haystack) ? $haystack : iterator_to_array($haystack, false);
    return Koan::report(!in_array($needle, $items, true), $message, [Koan::show($haystack) . ' contains ' . Koan::show($needle)]);
}

function assertArrayHasKey($key, $array, $message = ''): bool
{
    if (Koan::blank($key, $array)) return Koan::report(false, $message);
    return Koan::report(array_key_exists($key, $array), $message, [Koan::show($array) . ' has no key ' . Koan::show($key)]);
}

function assertArrayNotHasKey($key, $array, $message = ''): bool
{
    if (Koan::blank($key, $array)) return Koan::report(false, $message);
    return Koan::report(!array_key_exists($key, $array), $message, [Koan::show($array) . ' has the key ' . Koan::show($key)]);
}

// --- Strings

function assertStringContainsString($needle, $haystack, $message = ''): bool
{
    if (Koan::blank($needle, $haystack)) return Koan::report(false, $message);
    return Koan::report(str_contains($haystack, $needle), $message, [Koan::show($haystack) . ' does not contain ' . Koan::show($needle)]);
}

function assertStringStartsWith($prefix, $string, $message = ''): bool
{
    if (Koan::blank($prefix, $string)) return Koan::report(false, $message);
    return Koan::report(str_starts_with($string, $prefix), $message, [Koan::show($string) . ' does not start with ' . Koan::show($prefix)]);
}

function assertStringEndsWith($suffix, $string, $message = ''): bool
{
    if (Koan::blank($suffix, $string)) return Koan::report(false, $message);
    return Koan::report(str_ends_with($string, $suffix), $message, [Koan::show($string) . ' does not end with ' . Koan::show($suffix)]);
}

/** Passes when the regular expression (a PCRE pattern, like '/\d+/') matches the string. */
function assertMatchesRegularExpression($pattern, $string, $message = ''): bool
{
    if (Koan::blank($pattern, $string)) return Koan::report(false, $message);
    return Koan::report(preg_match($pattern, $string) === 1, $message, [Koan::show($pattern) . ' does not match ' . Koan::show($string)]);
}

// --- Types and objects

/** Passes when $actual is an instance of the class or interface named $expected (Foo::class). */
function assertInstanceOf($expected, $actual, $message = ''): bool
{
    if (Koan::blank($expected, $actual)) return Koan::report(false, $message);
    return Koan::report($actual instanceof $expected, $message, ["expected: $expected", '     got: ' . get_debug_type($actual)]);
}

function assertObjectHasProperty($property, $object, $message = ''): bool
{
    if (Koan::blank($property, $object)) return Koan::report(false, $message);
    return Koan::report(property_exists($object, $property), $message, [get_class($object) . ' has no property ' . Koan::show($property)]);
}

// assertIsInt, assertIsFloat, assertIsString, assertIsBool, assertIsArray, assertIsCallable,
// assertIsIterable, assertIsObject: PHPUnit's type checks.
function assertIsInt($actual, $message = ''): bool { return Koan::isType('int', is_int($actual), $actual, $message); }
function assertIsFloat($actual, $message = ''): bool { return Koan::isType('float', is_float($actual), $actual, $message); }
function assertIsString($actual, $message = ''): bool { return Koan::isType('string', is_string($actual), $actual, $message); }
function assertIsBool($actual, $message = ''): bool { return Koan::isType('bool', is_bool($actual), $actual, $message); }
function assertIsArray($actual, $message = ''): bool { return Koan::isType('array', is_array($actual), $actual, $message); }
function assertIsCallable($actual, $message = ''): bool { return Koan::isType('callable', is_callable($actual), $actual, $message); }
function assertIsIterable($actual, $message = ''): bool { return Koan::isType('iterable', is_iterable($actual), $actual, $message); }
function assertIsObject($actual, $message = ''): bool { return Koan::isType('object', is_object($actual), $actual, $message); }

// --- Exceptions

/**
 * Passes when calling $callback throws an instance of the class named $expected. PHPUnit expects
 * exceptions per test method ($this->expectException()); koans have no test methods, so this is
 * the koans' one addition. Returns the exception, so its message can be checked too.
 */
function assertThrows($expected, $callback, $message = ''): ?Throwable
{
    if (Koan::blank($expected, $callback)) {
        Koan::report(false, $message);
        return null;
    }
    try {
        $callback();
    } catch (Throwable $e) {
        Koan::report($e instanceof $expected, $message, ["expected: $expected", '     got: ' . get_class($e)]);
        return $e;
    }
    Koan::report(false, $message, ['expected: ' . $expected, '     got: no exception']);
    return null;
}
