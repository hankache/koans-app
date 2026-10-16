<?php
function roman(int $n): string
{
    $symbols = ['M' => 1000, 'CM' => 900, 'D' => 500, 'CD' => 400, 'C' => 100, 'XC' => 90, 'L' => 50, 'XL' => 40, 'X' => 10, 'IX' => 9, 'V' => 5, 'IV' => 4, 'I' => 1];
    $out = '';
    foreach ($symbols as $symbol => $value) {
        $out .= str_repeat($symbol, intdiv($n, $value));
        $n %= $value;
    }
    return $out;
}
assertSame('III', roman(3), 'the same symbol repeats');
assertSame('IV', roman(4), 'one before five');
assertSame('XIV', roman(14), 'ten, then four');
assertSame('MCMXCIV', roman(1994), 'a year');
assertSame('', roman(0), 'the Romans had no zero');
