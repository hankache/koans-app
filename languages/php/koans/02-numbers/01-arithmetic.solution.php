<?php
assertSame(3.5, 7 / 2, '/ can give a float');
assertSame(3, 6 / 2, 'but an exact division stays an int');
assertSame(3, intdiv(7, 2), 'intdiv drops the fraction');
assertSame(-1, -7 % 3, '% takes the sign of the left side');
assertSame(1024, 2 ** 10, '** is a power');
assertSame(0.5, 2 ** -1, 'a negative power gives a float');
