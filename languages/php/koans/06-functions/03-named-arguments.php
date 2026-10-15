// title: Named arguments
// intro: Arguments can be passed by name, in any order, skipping optional ones. Built-in functions accept them too.
<?php
function box(int $width = 1, int $height = 1, string $label = 'box'): string
{
    return "$label {$width}x$height";
}
assertSame(___, box(height: 5), 'skip to the one you want');
assertSame(___, box(label: 'crate', width: 2, height: 3), 'any order');
assertSame(___, implode(separator: ', ', array: ['a', 'b']), 'built-in functions too');
assertSame(___, str_pad(string: '42', length: 5, pad_string: '0', pad_type: STR_PAD_LEFT), 'clearer than four positional arguments');
