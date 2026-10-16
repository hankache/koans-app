<?php
function encode(string $s): string
{
    return preg_replace_callback('/(.)\1*/', fn($m) => strlen($m[0]) . $m[1], $s);
}
function decode(string $s): string
{
    return preg_replace_callback('/(\d+)(\D)/', fn($m) => str_repeat($m[2], (int) $m[1]), $s);
}
assertSame('3a1b2c', encode('aaabcc'), 'each run becomes a count and a letter');
assertSame('xxyyy', decode('2x3y'), 'decoding repeats each letter');
assertSame('hello', decode(encode('hello')), 'the round trip');
assertSame(4, strlen(encode('10000')), 'it can make a string longer');
