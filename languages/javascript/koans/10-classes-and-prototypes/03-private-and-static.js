// title: Private and static
// intro: A `#` field or method is private: only code inside the class can reach it. `static` members belong to the class itself.
class Account {
  #balance = 0;
  static created = 0;
  constructor() {
    Account.created++;
  }
  deposit(amount) {
    this.#balance += amount;
    return this.#balance;
  }
  static describe() {
    return `${Account.created} accounts`;
  }
}
const acct = new Account();
acct.deposit(50);
expect(acct.deposit(25), 'a private field keeps its value').toBe(___);
expect(acct.balance, 'and cannot be read from outside').toBe(___);
new Account();
expect(Account.describe(), 'a static method belongs to the class').toBe(___);
