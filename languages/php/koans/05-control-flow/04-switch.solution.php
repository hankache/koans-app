<?php
function size(string $s): string
{
    switch ($s) {
        case 'S':
        case 'M':
            $result = 'small or medium';
            break;
        case 'L':
            $result = 'large';
            break;
        default:
            $result = 'unknown';
    }
    return $result;
}
assertSame('small or medium', size('S'), 'cases can share code');
assertSame('unknown', size('XL'), 'default');
$falls = [];
switch (1) {
    case 1:
        $falls[] = 'one';
    case 2:
        $falls[] = 'two';
        break;
    case 3:
        $falls[] = 'three';
}
assertSame(['one', 'two'], $falls, 'without break, it falls through');
