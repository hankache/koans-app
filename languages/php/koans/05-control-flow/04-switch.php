// title: switch
// intro: `switch` is the older statement form: it compares with `==`, and falls through from one `case` to the next until a `break`.
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
assertSame(___, size('S'), 'cases can share code');
assertSame(___, size('XL'), 'default');
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
assertSame(___, $falls, 'without break, it falls through');
