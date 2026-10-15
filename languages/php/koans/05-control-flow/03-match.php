// title: match
// intro: `match` is an expression: it compares with `===`, needs no `break`, can test several values per arm, and throws `UnhandledMatchError` when nothing matches.
<?php
function status(int $code): string
{
    return match ($code) {
        200, 201 => 'ok',
        404 => 'not found',
        500 => 'error',
    };
}
assertSame(___, status(201), 'several values in one arm');
assertThrows(___, fn() => status(302), 'no arm matches');
$age = 30;
$stage = match (true) {
    $age < 13 => 'child',
    $age < 20 => 'teen',
    default => 'adult',
};
assertSame(___, $stage, 'match (true) tests conditions');
assertSame(___, match ('1') { 1 => 'yes', default => 'no' }, 'match is strict');
