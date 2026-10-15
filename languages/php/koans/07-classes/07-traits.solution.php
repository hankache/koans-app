<?php
trait Greets
{
    public function greet(): string
    {
        return "Hi, I'm {$this->name()}";
    }
}
trait Counts
{
    private int $count = 0;
    public function tick(): int { return ++$this->count; }
}
class Robot
{
    use Greets, Counts;
    public function name(): string { return 'R2'; }
}
$r = new Robot();
assertSame("Hi, I'm R2", $r->greet(), 'a method from a trait');
$r->tick();
assertSame(2, $r->tick(), 'traits can have state');
assertSame(['Greets', 'Counts'], array_values(class_uses($r)), 'class_uses lists them');
