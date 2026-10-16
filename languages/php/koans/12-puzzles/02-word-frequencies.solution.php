<?php
$freq = array_count_values(explode(' ', 'the cat and the hat and the bat'));
assertSame(3, $freq['the'], 'how often "the" appears');
arsort($freq);
assertSame(['the', 'and'], array_slice(array_keys($freq), 0, 2), 'the two most common');
assertSame(5, count($freq), 'how many different words');
assertSame(8, array_sum($freq), 'how many in all');
assertSame(0, $freq['dog'] ?? 0, 'a word never seen');
