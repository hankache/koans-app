// title: Word frequencies
// intro: `array_count_values` counts how often each value appears. `arsort` then sorts by count, highest first, keeping ties in their original order.
<?php
$freq = array_count_values(explode(' ', 'the cat and the hat and the bat'));
assertSame(___, $freq['the'], 'how often "the" appears');
arsort($freq);
assertSame(___, array_slice(array_keys($freq), 0, 2), 'the two most common');
assertSame(___, count($freq), 'how many different words');
assertSame(___, array_sum($freq), 'how many in all');
assertSame(___, $freq['dog'] ?? 0, 'a word never seen');
