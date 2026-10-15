// title: Arithmetic
// intro: `/` gives a float unless the division is exact; `intdiv` divides integers, `%` is the remainder with the sign of the left side, and `**` raises to a power.
<?php
assertSame(___, 7 / 2, '/ can give a float');
assertSame(___, 6 / 2, 'but an exact division stays an int');
assertSame(___, intdiv(7, 2), 'intdiv drops the fraction');
assertSame(___, -7 % 3, '% takes the sign of the left side');
assertSame(___, 2 ** 10, '** is a power');
assertSame(___, 2 ** -1, 'a negative power gives a float');
