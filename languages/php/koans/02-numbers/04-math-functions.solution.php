<?php
assertSame(3.0, round(2.5), 'round gives a float, halves away from zero');
assertSame(2.0, round(2.5, 0, PHP_ROUND_HALF_EVEN), "or to the even neighbor, banker's rounding");
assertSame(3.14, round(3.14159, 2), 'to some places');
assertSame(-2.0, floor(-1.5), 'floor rounds down');
assertSame(2.0, ceil(1.2), 'ceil rounds up');
assertSame(9, max(3, 9, 4), 'the largest');
assertSame(1, min([3, 1, 2]), 'min takes an array too');
