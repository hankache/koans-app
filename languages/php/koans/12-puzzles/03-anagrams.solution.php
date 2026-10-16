<?php
$words = ['listen', 'silent', 'enlist', 'google', 'gooegl', 'cat', 'act'];
$groups = [];
foreach ($words as $w) {
    $letters = str_split($w);
    sort($letters);
    $groups[implode($letters)][] = $w;
}
assertSame(['listen', 'silent', 'enlist'], $groups['eilnst'], 'sorted letters are the key');
assertCount(3, $groups, 'how many groups');
assertSame([3, 2, 2], array_map('count', array_values($groups)), 'the size of each');
assertSame(['cat', 'act'], $groups['act'], 'each group keeps the original order');
