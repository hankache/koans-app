<?php
$fiber = new Fiber(function (string $greeting): string {
    $name = Fiber::suspend("$greeting!");
    $mood = Fiber::suspend("Hello, $name");
    return "$name is $mood";
});
assertSame('Hi!', $fiber->start('Hi'), 'start runs to the first suspend');
assertSame('Hello, Ada', $fiber->resume('Ada'), 'resume sends a value in, and runs to the next');
assertSame(null, $fiber->resume('happy'), 'past the last suspend, resume gives null');
assertSame('Ada is happy', $fiber->getReturn(), 'getReturn gives the result');
assertSame(true, $fiber->isTerminated(), 'the fiber has finished');
