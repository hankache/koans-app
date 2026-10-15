<?php
function grade(int $score): string
{
    if ($score >= 90) {
        return 'A';
    } elseif ($score >= 75) {
        return 'B';
    }
    return 'C';
}
assertSame('B', grade(80), 'the first true branch');
assertSame('C', grade(10), 'or what follows');
$n = 5;
assertSame('odd', $n % 2 === 0 ? 'even' : 'odd', 'the ternary operator');
assertSame('positive', $n > 0 ? 'positive' : ($n < 0 ? 'negative' : 'zero'), 'nested, with parentheses');
