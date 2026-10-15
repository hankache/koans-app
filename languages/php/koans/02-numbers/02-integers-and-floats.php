// title: Integers and floats
// intro: An `int` takes `PHP_INT_SIZE` bytes: 8 on most servers, 4 in this WebAssembly build. Past `PHP_INT_MAX` arithmetic quietly becomes a float, and floats are binary approximations, so compare them with a margin.
<?php
assertSame(___, PHP_INT_SIZE, 'this PHP is 32-bit WebAssembly; most servers would say 8');
assertSame(___, PHP_INT_MAX, 'so the largest int is 2 ** 31 - 1');
assertSame(___, get_debug_type(PHP_INT_MAX + 1), 'one more is a float');
assertNotSame(___, 0.1 + 0.2, 'floats are approximate');
assertEqualsWithDelta(___, 0.1 + 0.2, 0.0001, 'so compare within a margin');
assertSame(___, is_nan(sqrt(-1)), 'NAN: not a number');
assertSame(___, is_infinite(fdiv(1, 0)), 'fdiv allows dividing by zero');
