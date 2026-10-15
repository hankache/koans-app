<?php
class Money
{
    public function __construct(private int $cents) {}
    public function __toString(): string { return sprintf('$%.2f', $this->cents / 100); }
}
assertSame('Total: $12.50', 'Total: ' . new Money(1250), '__toString');
class Config
{
    public function __construct(private array $values) {}
    public function __get(string $name): mixed { return $this->values[$name] ?? null; }
    public function __call(string $name, array $args): string { return $name . '(' . implode(', ', $args) . ')'; }
}
$c = new Config(['host' => 'localhost']);
assertSame('localhost', $c->host, '__get');
assertSame('connect(1, 2)', $c->connect(1, 2), '__call');
$double = new class {
    public function __invoke(int $n): int { return $n * 2; }
};
assertSame([2, 4], array_map($double, [1, 2]), '__invoke makes an object callable');
