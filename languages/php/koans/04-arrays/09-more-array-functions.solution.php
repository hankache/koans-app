<?php
assertSame(['a' => 1, 'b' => 2], array_combine(['a', 'b'], [1, 2]), 'keys and values combined');
assertSame(['x' => 0, 'y' => 1], array_flip(['x', 'y']), 'keys and values swapped');
assertSame(['a' => 2, 'b' => 1], array_count_values(['a', 'b', 'a']), 'count each value');
assertSame([[1, 2], [3]], array_chunk([1, 2, 3], 2), 'chunks');
$rows = [['id' => 3, 'name' => 'Ada'], ['id' => 7, 'name' => 'Alan']];
assertSame(['Ada', 'Alan'], array_column($rows, 'name'), 'a column of rows');
assertSame([3 => 'Ada', 7 => 'Alan'], array_column($rows, 'name', 'id'), 'keyed by another column');
assertSame([3, 1, 2], array_values(array_unique([3, 1, 3, 2, 1])), 'unique values');
