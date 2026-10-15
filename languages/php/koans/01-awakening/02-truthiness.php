// title: Truthiness
// intro: In a condition, `false`, `0`, `0.0`, `''`, `'0'`, `[]` and `null` count as false; everything else as true. The string `'0'` being false surprises nearly everyone.
<?php
assertSame(___, (bool) 0, 'zero is false');
assertSame(___, (bool) '0', "so is the string '0'");
assertSame(___, (bool) '0.0', "but not '0.0'");
assertSame(___, (bool) [], 'an empty array is false');
assertSame(___, (bool) ' ', 'a space is something');
assertSame(___, '' ?: 'default', '?: gives the right side when the left is falsy');
