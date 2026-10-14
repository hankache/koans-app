class Account {
  readonly id: number;
  #balance = 0;
  constructor(id: number) {
    this.id = id;
  }
  deposit(amount: number): number {
    this.#balance += amount;
    return this.#balance;
  }
  get balance(): number {
    return this.#balance;
  }
}
const account = new Account(7);
assert.equal(account.deposit(50), 50, 'a method');
assert.type<number>(account.balance, 'a getter has its result type');
assert.type<Account>(account, 'a class is also a type');
class Point {
  constructor(public x: number, public y: number) {}
}
const p = new Point(1, 2);
assert.deepEqual([p.x, p.y], [1, 2], 'public in the constructor declares and assigns properties');
