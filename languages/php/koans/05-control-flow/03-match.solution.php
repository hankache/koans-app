<?php
function status(int $code): string
{
    return match ($code) {
        200, 201 => 'ok',
        404 => 'not found',
        500 => 'error',
    };
}
assertSame('ok', status(201), 'several values in one arm');
assertThrows(UnhandledMatchError::class, fn() => status(302), 'no arm matches');
$age = 30;
$stage = match (true) {
    $age < 13 => 'child',
    $age < 20 => 'teen',
    default => 'adult',
};
assertSame('adult', $stage, 'match (true) tests conditions');
assertSame('no', match ('1') { 1 => 'yes', default => 'no' }, 'match is strict');
