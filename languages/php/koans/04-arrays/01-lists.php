// title: Lists
// intro: An array with keys 0, 1, 2… is a list. `[]` makes one, `$a[] = …` appends, and `count` counts.
<?php
$fruits = ['apple', 'banana'];
$fruits[] = 'cherry';
assertSame(___, $fruits[2], '[] = appends');
assertCount(___, $fruits, 'count');
assertSame(___, array_is_list($fruits), 'keys 0, 1, 2: a list');
assertSame(___, array_first($fruits), 'array_first gives the first item');
assertSame(___, array_last($fruits), 'and array_last');
assertSame(___, range(0, 6, 2), 'range builds a list');
