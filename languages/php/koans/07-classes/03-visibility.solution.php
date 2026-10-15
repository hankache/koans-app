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
assertSame(50, $account->balance, 'readable from outside');
assertThrows(Error::class, fn() => $account->balance = 1000, 'but private(set)');
assertThrows(Error::class, fn() => $account->log, 'a private property is hidden');
assertSame(1, $account->history(), 'methods can use it');
