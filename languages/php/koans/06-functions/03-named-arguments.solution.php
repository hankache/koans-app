<?php
function box(int $width = 1, int $height = 1, string $label = 'box'): string
{
    return "$label {$width}x$height";
}
assertSame('box 1x5', box(height: 5), 'skip to the one you want');
assertSame('crate 2x3', box(label: 'crate', width: 2, height: 3), 'any order');
assertSame('a, b', implode(separator: ', ', array: ['a', 'b']), 'built-in functions too');
assertSame('00042', str_pad(string: '42', length: 5, pad_string: '0', pad_type: STR_PAD_LEFT), 'clearer than four positional arguments');
