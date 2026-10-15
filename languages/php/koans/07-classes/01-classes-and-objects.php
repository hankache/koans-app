// title: Classes and objects
// intro: A class describes objects: properties hold their state and methods act on it, through `$this`. `new` makes one, and objects are passed around by handle, not copied.
<?php
class Lamp
{
    public bool $on = false;

    public function toggle(): static
    {
        $this->on = !$this->on;
        return $this;
    }
}
$lamp = new Lamp();
assertSame(___, $lamp->toggle()->on, 'returning $this lets calls chain');
$same = $lamp;
$same->toggle();
assertSame(___, $lamp->on, 'both names hold the same object');
$copy = clone $lamp;
$copy->toggle();
assertSame(___, $lamp->on, 'clone makes a separate copy');
assertInstanceOf(___, $copy, 'a Lamp');
