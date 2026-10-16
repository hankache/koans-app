// title: Run-length encoding
// intro: Run-length encoding squeezes repeats: `aaab` becomes `3a1b`. `preg_replace_callback` replaces each run, and each count, using a function.
<?php
function encode(string $s): string
{
    return preg_replace_callback('/(.)\1*/', fn($m) => strlen($m[0]) . $m[1], $s);
}
function decode(string $s): string
{
    return preg_replace_callback('/(\d+)(\D)/', fn($m) => str_repeat($m[2], (int) $m[1]), $s);
}
assertSame(___, encode('aaabcc'), 'each run becomes a count and a letter');
assertSame(___, decode('2x3y'), 'decoding repeats each letter');
assertSame(___, decode(encode('hello')), 'the round trip');
assertSame(___, strlen(encode('10000')), 'it can make a string longer');
