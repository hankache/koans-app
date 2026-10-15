// title: Traits
// intro: A trait is a bundle of methods (and properties) copied into classes with `use`, to share code between classes that aren't related.
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
assertSame(___, $r->greet(), 'a method from a trait');
$r->tick();
assertSame(___, $r->tick(), 'traits can have state');
assertSame(___, array_values(class_uses($r)), 'class_uses lists them');
