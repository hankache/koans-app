// title: Formatting numbers
// intro: `number_format` groups thousands and fixes decimals; `sprintf` formats with width, padding and precision; `base_convert` and friends change base.
<?php
assertSame(___, number_format(1234567.891, 2), 'grouped, two decimals');
assertSame(___, number_format(1234567.891, 2, ',', '.'), 'with other separators');
assertSame(___, sprintf('%03d', 7), 'zero-padded');
assertSame(___, sprintf('%.2f', M_PI), 'two decimals');
assertSame(___, dechex(255), 'hexadecimal');
assertSame(___, decbin(5), 'binary');
assertSame(___, bindec('11111111'), 'and back');
