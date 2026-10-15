// title: Types
// intro: Every value has a type: `int`, `float`, `string`, `bool`, `array`, `null`, or an object's class. `get_debug_type` names it, and the `is_*` functions ask about one.
<?php
assertSame(___, get_debug_type(42), 'whole numbers');
assertSame(___, get_debug_type(4.2), 'fractions');
assertSame(___, get_debug_type('42'), 'quotes make a string');
assertSame(___, get_debug_type([]), 'arrays');
assertSame(___, get_debug_type(new ArrayObject()), "an object's type is its class");
assertIsInt(___, 'assertIsInt checks for an int');
assertSame(___, is_numeric('3.14'), 'is_numeric accepts numeric strings');
