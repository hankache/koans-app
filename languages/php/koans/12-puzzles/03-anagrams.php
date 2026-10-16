// title: Anagrams
// intro: Two words are anagrams when they use the same letters. Sorting a word's letters gives a key that all its anagrams share.
<?php
$words = ['listen', 'silent', 'enlist', 'google', 'gooegl', 'cat', 'act'];
$groups = [];
foreach ($words as $w) {
    $letters = str_split($w);
    sort($letters);
    $groups[implode($letters)][] = $w;
}
assertSame(___, $groups['eilnst'], 'sorted letters are the key');
assertCount(___, $groups, 'how many groups');
assertSame(___, array_map('count', array_values($groups)), 'the size of each');
assertSame(___, $groups['act'], 'each group keeps the original order');
