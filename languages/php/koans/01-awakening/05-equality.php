// title: Equality
// intro: `===` wants the same type and value; `==` converts first. A number and a string that isn't numeric are compared as strings.
<?php
assertSame(___, 1 == '1', '== converts the string');
assertSame(___, 1 === '1', '=== does not');
assertSame(___, '10' == '1e1', 'two numeric strings compare as numbers');
assertSame(___, 0 == 'a', 'a number and a non-numeric string compare as strings');
assertSame(___, null == false, 'null and false are loosely equal');
assertEquals(___, 5, 'assertEquals uses ==');
assertNotSame(___, 5, 'assertNotSame wants them not identical');
