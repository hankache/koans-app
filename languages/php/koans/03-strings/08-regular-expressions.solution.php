<?php
assertSame(1, preg_match('/(\d+)-(\d+)/', 'pages 10-20', $m), 'preg_match returns 1 for a match');
assertSame('20', $m[2], 'and fills in the groups');
preg_match('/(?<year>\d{4})-(?<month>\d\d)/', '2026-10', $date);
assertSame('10', $date['month'], 'named groups');
assertSame(3, preg_match_all('/\d+/', 'a1b22c333', $all), 'preg_match_all counts the matches');
assertSame(['1', '22', '333'], $all[0], 'and collects them');
assertSame('Smith, John', preg_replace('/(\w+) (\w+)/', '$2, $1', 'John Smith'), 'replace with groups');
assertMatchesRegularExpression('/^\d{3}$/', '123', 'assertMatchesRegularExpression');
