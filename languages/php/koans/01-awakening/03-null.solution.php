<?php
$nothing = null;
assertNull($nothing, 'null is a value of its own');
assertSame('null', get_debug_type(null), 'and a type of its own');
assertSame('fallback', $nothing ?? 'fallback', '?? replaces null');
assertSame(0, 0 ?? 'fallback', 'but only null: 0 stays');
assertSame(false, isset($nothing), 'isset is false for null');
$settings = [];
assertSame('light', $settings['theme'] ?? 'light', '?? also covers a missing key');
