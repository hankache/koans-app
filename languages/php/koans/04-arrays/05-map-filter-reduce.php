// title: Map, filter and reduce
// intro: `array_map` transforms every item, `array_filter` keeps some (and keeps their keys), and `array_reduce` combines them.
<?php
assertSame(___, array_map(fn($n) => $n * 2, [1, 2, 3]), 'array_map');
assertSame(___, array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0), 'array_filter keeps the keys');
assertSame(___, array_values(array_filter([0, 1, '', 2, null])), 'with no function it drops falsy values');
assertSame(___, array_reduce([1, 2, 3, 4], fn($sum, $n) => $sum + $n, 0), 'array_reduce');
assertSame(___, array_map(strtoupper(...), ['a' => 'a', 'b' => 'b']), 'one array: keys are kept');
assertSame(___, array_sum([1, 2, 3]), 'array_sum');
