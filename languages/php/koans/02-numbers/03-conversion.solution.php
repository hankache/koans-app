<?php
assertSame(42, (int) '42', 'a cast to int');
assertSame(12, (int) '12 apples', 'reads the number at the start');
assertSame(0, (int) 'apples', 'or gives 0');
assertSame(3, (int) 3.99, 'a float cast to int is truncated');
assertSame('1.5', (string) 1.5, 'a number cast to a string');
assertSame(15, '10' + 5, 'arithmetic converts a numeric string');
assertThrows(TypeError::class, fn() => 'ten' + 5, 'and refuses a non-numeric one');
