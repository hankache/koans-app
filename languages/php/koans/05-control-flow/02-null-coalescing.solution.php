<?php
$config = ['debug' => false];
assertSame(false, $config['debug'] ?? true, 'false is not null, so it stays');
assertSame(8080, $config['port'] ?? 8080, 'a missing key gets the default');
$config['host'] ??= 'localhost';
$config['debug'] ??= true;
assertSame(['debug' => false, 'host' => 'localhost'], $config, '??= assigns only what is missing');
assertSame('c', $config['a'] ?? $config['b'] ?? 'c', '?? chains');
