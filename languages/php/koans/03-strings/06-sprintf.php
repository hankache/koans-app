// title: sprintf
// intro: `sprintf` builds a string from a template: `%s` a string, `%d` an integer, `%f` a float, with widths, padding, alignment and numbered arguments.
<?php
assertSame(___, sprintf('%s is %d', 'Ada', 36), 'strings and integers');
assertSame(___, sprintf('[%5d]', 42), 'a width');
assertSame(___, sprintf('[%-5s]', 'ab'), 'left-aligned');
assertSame(___, sprintf('%d%%', 50), '%% is a percent sign');
assertSame(___, sprintf('%2$s %1$s', 'a', 'b'), 'numbered arguments');
assertSame(___, sprintf('%+d', 5), 'always a sign');
