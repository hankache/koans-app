// title: Static variables
// intro: A `static` variable inside a function keeps its value from one call to the next. It's set up once, on the first call.
<?php
function counter(): int
{
    static $count = 0;
    return ++$count;
}
counter();
counter();
assertSame(___, counter(), 'a static variable keeps its value between calls');
function fib(int $n): int
{
    static $memo = [];
    return $memo[$n] ??= $n < 2 ? $n : fib($n - 1) + fib($n - 2);
}
assertSame(___, fib(10), 'handy for remembering results');
class Ids
{
    public static function next(): int
    {
        static $id = 100;
        return ++$id;
    }
}
Ids::next();
assertSame(___, Ids::next(), 'methods can have them too');
