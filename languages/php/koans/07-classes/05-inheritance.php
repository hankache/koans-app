// title: Inheritance
// intro: A class `extends` one parent, inheriting its members and overriding some; `parent::` calls the parent's version. `final` stops a class from being extended or a method from being overridden.
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
assertSame(___, $rex->speak(), 'parent:: calls the original');
assertInstanceOf(___, $rex, 'a dog is an animal');
assertSame(___, get_parent_class($rex), 'its parent');
