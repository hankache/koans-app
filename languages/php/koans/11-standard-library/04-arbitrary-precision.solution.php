<?php
assertSame('0.3', bcadd('0.1', '0.2', 1), 'exact decimal addition');
assertSame('0.33', bcdiv('1', '3', 2), 'division to a chosen scale');
assertSame('1267650600228229401496703205376', bcpow('2', '100'), 'no overflow');
$price = new BcMath\Number('19.99');
$total = $price * 3;
assertSame('59.97', (string) $total, 'BcMath\\Number works with operators');
