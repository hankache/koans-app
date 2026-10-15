// title: More array functions
// intro: A handful more do common jobs in one call: combining, flipping, counting, chunking, and picking a column out of rows.
<?php
assertSame(___, array_combine(['a', 'b'], [1, 2]), 'keys and values combined');
assertSame(___, array_flip(['x', 'y']), 'keys and values swapped');
assertSame(___, array_count_values(['a', 'b', 'a']), 'count each value');
assertSame(___, array_chunk([1, 2, 3], 2), 'chunks');
$rows = [['id' => 3, 'name' => 'Ada'], ['id' => 7, 'name' => 'Alan']];
assertSame(___, array_column($rows, 'name'), 'a column of rows');
assertSame(___, array_column($rows, 'name', 'id'), 'keyed by another column');
assertSame(___, array_values(array_unique([3, 1, 3, 2, 1])), 'unique values');
