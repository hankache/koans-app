<?php
assertSame(true, 1 == '1', '== converts the string');
assertSame(false, 1 === '1', '=== does not');
assertSame(true, '10' == '1e1', 'two numeric strings compare as numbers');
assertSame(false, 0 == 'a', "since PHP 8, 0 == 'a' is false");
assertSame(true, null == false, 'null and false are loosely equal');
assertEquals('5', 5, 'assertEquals uses ==');
assertNotSame('5', 5, 'assertNotSame wants them not identical');
