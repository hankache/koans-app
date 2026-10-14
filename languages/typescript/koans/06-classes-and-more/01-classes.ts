// title: Classes
// intro: Class properties need types. `readonly` stops a property changing, `#` keeps it private when the code runs, and `public` in front of a constructor parameter declares and assigns a property in one go.
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
assert.equal(account.deposit(50), ___, 'a method');
assert.type<___>(account.balance, 'a getter has its result type');
assert.type<___>(account, 'a class is also a type');
class Point {
  constructor(public x: number, public y: number) {}
}
const p = new Point(1, 2);
assert.deepEqual([p.x, p.y], ___, 'public in the constructor declares and assigns properties');
