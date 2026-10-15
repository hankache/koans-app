// title: Conditions
// intro: `if`, `elseif` and `else`, and the ternary operator. Unlike some languages, nested ternaries need parentheses in PHP.
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
assertSame(___, grade(80), 'the first true branch');
assertSame(___, grade(10), 'or what follows');
$n = 5;
assertSame(___, $n % 2 === 0 ? 'even' : 'odd', 'the ternary operator');
assertSame(___, $n > 0 ? 'positive' : ($n < 0 ? 'negative' : 'zero'), 'nested, with parentheses');
