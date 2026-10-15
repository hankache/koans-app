// title: null
// intro: `null` is PHP's "no value": what a variable without a value holds, and what many functions return when they find nothing. `??` supplies a default for it.
<?php
$nothing = null;
assertNull(___, 'null is a value of its own');
assertSame(___, get_debug_type(null), 'and a type of its own');
assertSame(___, $nothing ?? 'fallback', '?? replaces null');
assertSame(___, 0 ?? 'fallback', 'but only null: 0 stays');
assertSame(___, isset($nothing), 'isset is false for null');
$settings = [];
assertSame(___, $settings['theme'] ?? 'light', '?? also covers a missing key');
