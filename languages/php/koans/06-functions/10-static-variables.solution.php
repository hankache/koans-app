<?php
function counter(): int
{
    static $count = 0;
    return ++$count;
}
counter();
counter();
assertSame(3, counter(), 'a static variable keeps its value between calls');
function fib(int $n): int
{
    static $memo = [];
    return $memo[$n] ??= $n < 2 ? $n : fib($n - 1) + fib($n - 2);
}
assertSame(55, fib(10), 'handy for remembering results');
class Ids
{
    public static function next(): int
    {
        static $id = 100;
        return ++$id;
    }
}
Ids::next();
assertSame(102, Ids::next(), 'methods can have them too');
