<?php
assertSame('int', get_debug_type(42), 'whole numbers');
assertSame('float', get_debug_type(4.2), 'fractions');
assertSame('string', get_debug_type('42'), 'quotes make a string');
assertSame('array', get_debug_type([]), 'arrays');
assertSame('ArrayObject', get_debug_type(new ArrayObject()), "an object's type is its class");
assertIsInt(7, 'assertIsInt checks for an int');
assertSame(true, is_numeric('3.14'), 'is_numeric accepts numeric strings');
