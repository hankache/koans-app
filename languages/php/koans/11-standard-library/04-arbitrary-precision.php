// title: Arbitrary precision
// intro: Floats can't hold money exactly. The `bcmath` functions, and since PHP 8.4 the `BcMath\Number` class, do decimal arithmetic on numbers written as strings, to any precision.
<?php
assertSame(___, bcadd('0.1', '0.2', 1), 'exact decimal addition');
assertSame(___, bcdiv('1', '3', 2), 'division to a chosen scale');
assertSame(___, bcpow('2', '100'), 'no overflow');
$price = new BcMath\Number('19.99');
$total = $price * 3;
assertSame(___, (string) $total, 'BcMath\\Number works with operators');
