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
assertSame(true, $lamp->toggle()->on, 'returning $this lets calls chain');
$same = $lamp;
$same->toggle();
assertSame(false, $lamp->on, 'both names hold the same object');
$copy = clone $lamp;
$copy->toggle();
assertSame(false, $lamp->on, 'clone makes a separate copy');
assertInstanceOf(Lamp::class, $copy, 'a Lamp');
