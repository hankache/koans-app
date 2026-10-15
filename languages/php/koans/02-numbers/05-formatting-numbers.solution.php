<?php
assertSame('1,234,567.89', number_format(1234567.891, 2), 'grouped, two decimals');
assertSame('1.234.567,89', number_format(1234567.891, 2, ',', '.'), 'with other separators');
assertSame('007', sprintf('%03d', 7), 'zero-padded');
assertSame('3.14', sprintf('%.2f', M_PI), 'two decimals');
assertSame('ff', dechex(255), 'hexadecimal');
assertSame('101', decbin(5), 'binary');
assertSame(255, bindec('11111111'), 'and back');
