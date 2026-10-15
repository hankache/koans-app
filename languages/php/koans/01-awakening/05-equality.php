// title: Equality
// intro: `===` wants the same type and value; `==` converts first. Since PHP 8, comparing a number with a string that isn't numeric compares them as strings, which ended many old surprises.
<?php
assertSame(___, 1 == '1', '== converts the string');
assertSame(___, 1 === '1', '=== does not');
assertSame(___, '10' == '1e1', 'two numeric strings compare as numbers');
assertSame(___, 0 == 'a', "since PHP 8, 0 == 'a' is false");
assertSame(___, null == false, 'null and false are loosely equal');
assertEquals(___, 5, 'assertEquals uses ==');
assertNotSame(___, 5, 'assertNotSame wants them not identical');
