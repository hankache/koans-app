<?php
assertSame([2, 4, 6], array_map(fn($n) => $n * 2, [1, 2, 3]), 'array_map');
assertSame([1 => 2, 3 => 4], array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0), 'array_filter keeps the keys');
assertSame([1, 2], array_values(array_filter([0, 1, '', 2, null])), 'with no function it drops falsy values');
assertSame(10, array_reduce([1, 2, 3, 4], fn($sum, $n) => $sum + $n, 0), 'array_reduce');
assertSame(['a' => 'A', 'b' => 'B'], array_map(strtoupper(...), ['a' => 'a', 'b' => 'b']), 'one array: keys are kept');
assertSame(6, array_sum([1, 2, 3]), 'array_sum');
