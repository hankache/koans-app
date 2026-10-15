// title: Math functions
// intro: Rounding comes in several directions, and `max`, `min` and `abs` work on any numbers. `round` rounds halves away from zero unless told otherwise.
<?php
assertSame(___, round(2.5), 'round gives a float, halves away from zero');
assertSame(___, round(2.5, 0, PHP_ROUND_HALF_EVEN), "or to the even neighbour, banker's rounding");
assertSame(___, round(3.14159, 2), 'to some places');
assertSame(___, floor(-1.5), 'floor rounds down');
assertSame(___, ceil(1.2), 'ceil rounds up');
assertSame(___, max(3, 9, 4), 'the largest');
assertSame(___, min([3, 1, 2]), 'min takes an array too');
