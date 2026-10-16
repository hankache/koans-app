// title: Fibers
// intro: A `Fiber` runs a function that can pause itself with `Fiber::suspend`, handing a value out. `resume` sends a value back in and carries on from there.
<?php
$fiber = new Fiber(function (string $greeting): string {
    $name = Fiber::suspend("$greeting!");
    $mood = Fiber::suspend("Hello, $name");
    return "$name is $mood";
});
assertSame(___, $fiber->start('Hi'), 'start runs to the first suspend');
assertSame(___, $fiber->resume('Ada'), 'resume sends a value in, and runs to the next');
assertSame(___, $fiber->resume('happy'), 'past the last suspend, resume gives null');
assertSame(___, $fiber->getReturn(), 'getReturn gives the result');
assertSame(___, $fiber->isTerminated(), 'the fiber has finished');
