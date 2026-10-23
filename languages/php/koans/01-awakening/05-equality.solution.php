<?php
assertSame(true, 1 == '1', '== converts the string');
assertSame(false, 1 === '1', '=== does not');
assertSame(true, '10' == '1e1', 'two numeric strings compare as numbers');
assertSame(false, 0 == 'a', 'a number and a non-numeric string compare as strings');
assertSame(true, null == false, 'null and false are loosely equal');
assertEquals('5', 5, 'assertEquals uses ==');
assertNotSame('5', 5, 'assertNotSame wants them not identical');
