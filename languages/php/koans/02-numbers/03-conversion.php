// title: Conversion
// intro: Casts convert: `(int)` reads the number at the start of a string, `(float)` likewise, `(string)` writes a number out. Arithmetic on a numeric string converts it; on a non-numeric one it's an error.
<?php
assertSame(___, (int) '42', 'a cast to int');
assertSame(___, (int) '12 apples', 'reads the number at the start');
assertSame(___, (int) 'apples', 'or gives 0');
assertSame(___, (int) 3.99, 'a float cast to int is truncated');
assertSame(___, (string) 1.5, 'a number cast to a string');
assertSame(___, '10' + 5, 'arithmetic converts a numeric string');
assertThrows(___, fn() => 'ten' + 5, 'and refuses a non-numeric one');
