<?php
assertSame('Ada is 36', sprintf('%s is %d', 'Ada', 36), 'strings and integers');
assertSame('[   42]', sprintf('[%5d]', 42), 'a width');
assertSame('[ab   ]', sprintf('[%-5s]', 'ab'), 'left-aligned');
assertSame('50%', sprintf('%d%%', 50), '%% is a percent sign');
assertSame('b a', sprintf('%2$s %1$s', 'a', 'b'), 'numbered arguments');
assertSame('+5', sprintf('%+d', 5), 'always a sign');
