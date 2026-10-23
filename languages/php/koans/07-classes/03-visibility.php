// title: Visibility
// intro: `public` members are open to everyone, `protected` to the class and its children, `private` to the class alone. Asymmetric visibility, `public private(set)`, makes a property readable everywhere but writable only inside its class.
<?php
class Account
{
    public private(set) int $balance = 0;
    private array $log = [];

    public function deposit(int $amount): void
    {
        $this->balance += $amount;
        $this->log[] = $amount;
    }

    public function history(): int
    {
        return count($this->log);
    }
}
$account = new Account();
$account->deposit(50);
assertSame(___, $account->balance, 'readable from outside');
assertThrows(___, fn() => $account->balance = 1000, 'but private(set)');
assertThrows(___, fn() => $account->log, 'a private property is hidden');
assertSame(___, $account->history(), 'methods can use it');
