// title: Magic methods
// intro: Methods named with two underscores are called by PHP itself: `__toString` when an object is used as a string, `__get` for a missing property, `__call` for a missing method, `__invoke` when it's called like a function.
<?php
class Money
{
    public function __construct(private int $cents) {}
    public function __toString(): string { return sprintf('$%.2f', $this->cents / 100); }
}
assertSame(___, 'Total: ' . new Money(1250), '__toString');
class Config
{
    public function __construct(private array $values) {}
    public function __get(string $name): mixed { return $this->values[$name] ?? null; }
    public function __call(string $name, array $args): string { return $name . '(' . implode(', ', $args) . ')'; }
}
$c = new Config(['host' => 'localhost']);
assertSame(___, $c->host, '__get');
assertSame(___, $c->connect(1, 2), '__call');
$double = new class {
    public function __invoke(int $n): int { return $n * 2; }
};
assertSame(___, array_map($double, [1, 2]), '__invoke makes an object callable');
