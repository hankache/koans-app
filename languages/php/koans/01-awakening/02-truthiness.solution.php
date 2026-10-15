<?php
assertSame(false, (bool) 0, 'zero is false');
assertSame(false, (bool) '0', "so is the string '0'");
assertSame(true, (bool) '0.0', "but not '0.0'");
assertSame(false, (bool) [], 'an empty array is false');
assertSame(true, (bool) ' ', 'a space is something');
assertSame('default', '' ?: 'default', '?: gives the right side when the left is falsy');
