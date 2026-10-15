<?php
assertSame(4, PHP_INT_SIZE, 'this PHP is 32-bit WebAssembly; most servers would say 8');
assertSame(2147483647, PHP_INT_MAX, 'so the largest int is 2 ** 31 - 1');
assertSame('float', get_debug_type(PHP_INT_MAX + 1), 'one more is a float');
assertNotSame(0.3, 0.1 + 0.2, 'floats are approximate');
assertEqualsWithDelta(0.3, 0.1 + 0.2, 0.0001, 'so compare within a margin');
assertSame(true, is_nan(sqrt(-1)), 'NAN: not a number');
assertSame(true, is_infinite(fdiv(1, 0)), 'fdiv allows dividing by zero');
