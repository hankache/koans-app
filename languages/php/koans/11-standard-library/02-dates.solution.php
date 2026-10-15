<?php
$day = new DateTimeImmutable('2026-10-15');
assertSame('Thursday', $day->format('l'), 'the day of the week');
assertSame('2026-11-15', $day->modify('+1 month')->format('Y-m-d'), 'modify returns a new date');
assertSame('2026-10-15', $day->format('Y-m-d'), 'the original is unchanged');
$christmas = new DateTimeImmutable('2026-12-25');
assertSame(71, $day->diff($christmas)->days, 'days between');
assertSame('2026-02-28', (new DateTimeImmutable('2026-02-01'))->modify('last day of this month')->format('Y-m-d'), 'relative formats');
