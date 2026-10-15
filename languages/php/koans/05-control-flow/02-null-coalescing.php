// title: Null coalescing
// intro: `??` gives its left side unless it's `null` or missing, and `??=` assigns only when the variable is `null` or unset. They never warn about missing keys.
<?php
$config = ['debug' => false];
assertSame(___, $config['debug'] ?? true, 'false is not null, so it stays');
assertSame(___, $config['port'] ?? 8080, 'a missing key gets the default');
$config['host'] ??= 'localhost';
$config['debug'] ??= true;
assertSame(___, $config, '??= assigns only what is missing');
assertSame(___, $config['a'] ?? $config['b'] ?? 'c', '?? chains');
