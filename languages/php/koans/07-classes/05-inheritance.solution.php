<?php
class Animal
{
    public function __construct(protected string $name) {}

    public function speak(): string
    {
        return "{$this->name} makes a sound";
    }
}
class Dog extends Animal
{
    public function speak(): string
    {
        return str_replace('makes a sound', 'barks', parent::speak());
    }
}
$rex = new Dog('Rex');
assertSame('Rex barks', $rex->speak(), 'parent:: calls the original');
assertInstanceOf(Animal::class, $rex, 'a dog is an animal');
assertSame('Animal', get_parent_class($rex), 'its parent');
